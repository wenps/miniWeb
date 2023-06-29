const { name } = require('./package');
module.exports = {
  publicPath: 'http://localhost:9002/',
  devServer: {
    port: 9002,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    mode: 'development',
    output: {
      library: `${name}`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },
}
