/*
 * @Author: your name
 * @Date: 2019-12-14 15:30:53
 * @LastEditTime : 2020-01-10 17:54:25
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
      //一键轮询
      '/easynvr/admin': {
        target: 'http://192.168.63.200:3000/mock/20/',
        changeOrigin: true,

      },
      //鉴权
      '/security': {
        target: 'http://192.168.63.200:8080',
      },
      //应急响应
      '/emergency': {
        target: 'http://192.168.63.200:8081',
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
      '/childApp/m-tigerprawn-hand': {
        target: 'http://192.168.63.43:8089',
      },
      '/gjaqapi': {
        target: 'http://192.168.63.200:28000',
        changeOrigin: true,
        pathRewrite: {
          '^/gjaqapi': '/api'
        }
      },
      '/folder': {
        target: 'http://192.168.63.200:28088',
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
