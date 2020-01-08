/*
 * @Author: your name
 * @Date: 2019-12-14 15:30:53
 * @LastEditTime : 2020-01-08 10:29:30
 * @LastEditors  : Please set LastEditors
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

      '/security': {
        target: 'http://192.168.63.13:8080',
      },
      '/emergency': {
        target: 'http://192.168.63.13:8081',
      },
      '/childApp/tiger-prawn-mbcs': {
        target: 'http://192.168.63.19:8088',
      },
      '/childApp/tiger-prawn-mbspecial': {
        target: 'http://192.168.63.19:8089',
      },
      '/childApp/m-tigerprawn-dingmsg': {
        target: 'http://192.168.63.19:8089',
      },
      '/gjaqapi': {
        target: 'http://192.168.63.200:28000',
        changeOrigin: true,
        pathRewrite: {
          '^/gjaqapi': '/api'
        }
      },
      '/file': {
        target: 'http://192.168.63.200:28088',
        // changeOrigin: true,
        // pathRewrite: {
        //   '^/test': '/test'
        // }
      }
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
