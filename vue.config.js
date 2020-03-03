/*
 * @Author: your name
 * @Date: 2019-12-14 15:30:53
 * @LastEditTime: 2020-03-03 19:01:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn\tiger-prawn-mbfw\vue.config.js
 */
const packageName = require('./package.json').name;

module.exports = {
  publicPath: `/`,
  outputDir: `${packageName}`,
  lintOnSave: false,
  assetsDir: "",
  configureWebpack: {
    // resolve: {
    //   extensions: ['.js', '.json', '.vue'],
    //   alias: {
    //     '@': path.resolve(__dirname, 'src/'),

    //   },
    // },
  },
  devServer: {
    port: 8081,
    proxy: {
      // '/articles': {
      //   target: 'http://192.168.63.13:28000',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/articles': '/articles'
      //   }
      // },
     
      //子应用代理，开发
      '/childApp/m-tigerprawn-special': {
        target: 'http://192.168.63.19:8089',
      },

    }
  },
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ]
}
