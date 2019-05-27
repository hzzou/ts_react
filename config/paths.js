//这些命令是基于node环境运行的，因为全局安装了node。所以可以运行
const path = require('path'); //路径
const fs = require('fs'); //文件系统

//process.cwd() 返回Node.js进程的当前工作目录
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appBuild:resolveApp('build'),
  appPublic:resolveApp('public'),
  appFavicon:resolveApp('public/favicon.ico'),
  appIndex:resolveApp('src/index.tsx'),
  appHtml:resolveApp('public/index.html'),
  appNodeModules:resolveApp('node_modules'),
  appSrc:resolveApp('src'),
  appPath:resolveApp('.'),
}
