const { defineConfig } = require('@vue/cli-service')
const { name } = require('./package');
module.exports = defineConfig(
  {
    devServer: {
      port: 9002,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    configureWebpack: {
      output: {
        library: `${name}-[name]`,
        libraryTarget: 'umd', // 把微应用打包成 umd 库格式
        chunkLoadingGlobal: `webpackJsonp_${name}`,
      },
    },
  }
)
