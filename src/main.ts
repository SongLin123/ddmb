/*
 * @Author: your name
 * @Date: 2019-12-14 15:22:42
 * @LastEditTime: 2019-12-16 18:55:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn\tiger-prawn-mbfw\src\main.ts
 */
import Vue from 'vue';
import App from "./App.vue";
import { init } from './qiankun.config';
import * as dd from 'dingtalk-jsapi';
import { initQasar } from './quasar';


Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    async goto(title: string, link: { path?: string; appPath?: string; name: string }) {
      link.path ? this.$router.push(link.path) : window.history.pushState({}, title, link.appPath);

      if (dd.env.version) {
        dd.ready(() => {
          // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
          dd.biz.navigation.setTitle({ title });
        });
      }
    },
  },
});

init(Vue, App, initQasar);


// jsapi 鉴权，暂时不用
// dd.config({
//   agentId: '33998', // 必填，微应用ID
//   corpId: 'dingeb68041d2ba9538cacaaa37764f94726	',//必填，企业ID
//   timeStamp: '', // 必填，生成签名的时间戳
//   nonceStr: '', // 必填，生成签名的随机串
//   signature: '', // 必填，签名
//   type:0,   //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
//   jsApiList : [
//       'runtime.info',
//       'biz.contact.choose',
//       'device.notification.confirm',
//       'device.notification.alert',
//       'device.notification.prompt',
//       'biz.ding.post',
//       'biz.util.openLink',
//   ], // 必填，需要使用的jsapi列表，注意：不要带dd。
// });



