const CleanWebpackPlugin = require('clean-webpack-plugin');
const paths = require('../paths');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TsImportPlugin = require('ts-import-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  mode:'production',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.jsx']
  },
  entry:paths.appIndex,
  output:{
    path:paths.appBuild,//项目构打包之后存放的位置
    filename:'static/js/[name]-[hash:8].js',
    publicPath:'./',  //默认就是项目的根目录(相对路径),设置为绝对路径会出错
  },
  devtool: 'cheap-module-source-map',
  module:{
    rules:[
      {
        enforce: 'pre',//先执行
        test: /\.js$/,
        loader: 'source-map-loader' //加载devtool的map
      },
      {
        test: /\.(ts|tsx|jsx|js)$/,
        loader: 'ts-loader',
        options:{
          transpileOnly:true,
          getCustomTransformers:()=>({
            before:[
              TsImportPlugin({
                libraryName:'antd',
                libraryDirectory:'lib',
                style:true
              })
            ]
          })
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader'
      },
      {
        test: /\.styl$/,
        use: [
          { loader: 'style-loader' },
          { loader: MiniCssExtractPlugin.loader },//这个loader的位置一定不能放错，只能放在style-loader和css-loader之间
          { loader: 'css-loader' },
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
          { loader: MiniCssExtractPlugin.loader },//这个loader的位置一定不能放错，只能放在style-loader和css-loader之间
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
  optimization:{
    minimizer:[
      new UglifyJsPlugin({
        cache:true,
        parallel:true,
        sourceMap:true
      }),
      new OptimizeCssAssetsPlugin()
    ]
  },
  plugins:[
    //每次build的时候，清空上一次的文件,不用传任何参数(最新版的)或者是纯对象
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      title: 'React和TypeScript项目', //此处可动态修改public里的index.html的标题
      template: paths.appHtml, //模板路径
      minify: {
        removeComments: true, //去除注释
        collapseWhitespace: true, //去除空格
      },
      //favicon只需要在生产模式下设置
      favicon:'./favicon.ico' //设置相对路径,别设置为绝对路径 '/'
    }),
    new MiniCssExtractPlugin({
      filename:'static/css/[name]-[contenthash:8].css'
    })
  ]
})