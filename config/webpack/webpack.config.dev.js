const paths = require('../paths');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsImportPlugin = require('ts-import-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const smp = new SpeedMeasurePlugin();

//path.resolve()方法将路径或路径片段从右往左拼接为绝对路径，成功则停止
//console.log(path.resolve('node_modules'))
//console.log(path.resolve('src/index.styl'))
//console.log(process.env)

//设置babel-preset-react-app所需NODE_ENV
process.env.NODE_ENV = 'development';

//webpack里的module
module.exports = smp.wrap({
  mode:'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.jsx']
  },
  entry:[
    paths.appIndex,
    require.resolve('react-dev-utils/webpackHotDevClient'),
  ],
  devtool: 'cheap-source-map',//开发环境使用
  output:{
    filename:'static/js/boundle.js',
    //热更新文件名的配置,不要配置hash文件名
    //这样热更新的时候好冲掉上次的文件
    hotUpdateChunkFilename: 'static/js/boundle-hot-[hash:8].js',
    hotUpdateMainFilename: 'static/js/boundle-hot.js',
    publicPath: '/',//绝对路径
    //此处配置是把浏览器调试处不需要的信息过滤
    //根据devtool的模式来决定的
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  module:{
    rules:[
      {
        enforce: 'pre',//先执行
        test: /\.js$/,
        loader: 'source-map-loader'//加载devtool的map
      },
      {
        test: /\.(ts|tsx)$/,
        use:[
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, //此选项可加快编译速度
              getCustomTransformers: () => ({
                before: [
                  TsImportPlugin({ //对antd按需加载,此处也可使用数组对多个样式进行按需加载
                    libraryName: 'antd',
                    libraryDirectory: 'lib',
                    style: true
                  })
                ]
              }),
              errorFormatter: require('react-dev-utils/eslintFormatter')
            }
          }
        ]
      },
      {
        test:/\.(png|jpg|jpeg|gif|svg)$/,
        loader:'url-loader'
      },
      {
        test: /\.styl$/,
        use: [
          { loader: 'style-loader' },
          { 
            loader: 'css-loader' //css模块化问题待解决
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './config/webpack/postcss.config.js'
              }
            }
          },
          { loader: 'stylus-loader' },
        ]
      },
      {
        test: /\.(css|less)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              config: {//path路径是相对于整个项目的根目录
                path: './config/webpack/postcss.config.js'
              }
            }
          },
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true }
          },
        ]
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: 'React和TypeScript项目', //此处可动态修改public里的index.html的标题
      template: paths.appHtml //模板路径
    }),
    //热替换模块 永远不要在生产环境(production)下启用HMR
    new webpack.HotModuleReplacementPlugin(),
    //块命名插件
    new webpack.NamedChunksPlugin(),
    //module命名插件
    new webpack.NamedModulesPlugin(),
    //watch 配合热替换模块
    new WatchMissingNodeModulesPlugin(paths.appNodeModules)
    
  ],
  devServer:{//webpack-dev-server
    historyApiFallback: true, //任意的 404 响应都可能需要被替代为 index.html
    disableHostCheck: true, //此选项绕过主机检查
    host:'localhost',
    port:'8000',
    inline:true, //页面内容的刷新方式
    hot:true, //启动热替换特性
    open:true, //打开默认浏览器
    clientLogLevel:'none', //关闭webpack内置的打印信息
    publicPath: '/', //绝对路径
    watchContentBase:true,
    //proxy:{}
  }
})