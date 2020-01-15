/*
 * @Author: your name
 * @Date: 2019-12-14 15:22:42
 * @LastEditTime : 2020-01-15 14:03:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn\tiger-prawn-mbfw\src\main.ts
 */
import Vue from 'vue';
import App from "./App.vue";
import { init } from './qiankun.config';
import * as dd from 'dingtalk-jsapi';
import { initQasar } from './quasar';
import { Notify } from 'quasar';


const Emun = new Map([["m-tigerprawn-special", "safetycontrol"], ["m-tigerprawn-dingmsg", "emergency"]]);

import Axios from "axios";
const userLogin = (code: string, moduleName: string) => Axios.get(`/security/checkLogin/${code}/${moduleName}`)
  .then((res) => res.data);
const getSign = (params: any) => Axios.request({
  method: "post",
  url: "/security/getJsapiTicket",
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  data: params,
  transformRequest: [
    (oldData: any) => {
      const data = new FormData();
      for (const item in oldData) {
        data.set(item, oldData[item]);
      }
      return data;
    },
  ],
}).then((res) => res.data);


Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    async goto(title: string, appName: string) {
      window.history.pushState({}, title, `/${appName}/`);

      if (dd.env.version) {
        dd.ready(() => {

          dd.biz.navigation.setTitle({ title });
        });
      }
    },
  },
});


if (dd.env.version) {
  dd.ready(async () => {
    // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
    const code: string = await new Promise((res) => {
      (dd.runtime.permission as any).requestAuthCode({
        corpId: "ding38a65ac3e948dd2135c2f4657eb6378f",
        // corpId: "ding2160d2bbcf06b61d4ac5d6980864d335",
        onSuccess(result: any) {
          res(result.code);
        },
      });
    });

    let msg: any;
    let signmsg: any;
    try {
      msg = await userLogin(code, Emun.get(location.pathname.split("/")[1])!);

      signmsg = await getSign({
        signedUrl: location.href.split("#")[0],
        appName: Emun.get(location.pathname.split("/")[1])!,
      });
    } catch (error) {
      Notify.create(error.toString());
    }



    if (signmsg.statusCode === 200) {
      // jsapi 鉴权
      dd.config({
        agentId: signmsg.data.agentId, // 必填，微应用ID
        corpId: signmsg.data.corpId, // 必填，企业ID
        timeStamp: signmsg.data.timeStamp, // 必填，生成签名的时间戳
        nonceStr: signmsg.data.nonceStr, // 必填，生成签名的随机串
        signature: signmsg.data.signature, // 必填，签名
        type: 0,
        jsApiList: [
          'runtime.info',
          'biz.contact.choose',
          'biz.contact.chooseMobileContacts',
          'biz.contact.complexPicker',
          'device.notification.confirm',
          'device.notification.alert',
          'device.notification.prompt',
          'biz.ding.post',
          'biz.ding.create',
          'biz.cspace.saveFile',
          'biz.cspace.preview',
          'biz.cspace.chooseSpaceDir',
          'biz.util.uploadAttachment',
          'biz.util.openLink',
          "biz.map.locate",
          "biz.map.search",
          "device.geolocation.get",
          "biz.map.view",
          "device.geolocation.start",
          "device.geolocation.stop",
          "device.geolocation.status",
        ], // 必填，需要使用的jsapi列表，注意：不要带dd。
      });
      Object.assign(window, {
        ddconfig: {
          user: msg.data as {
            userid: string;
            token: string;
            list: [{ id: string; name: string }];
          },
          appid: signmsg.data.agentId,
          corpId: signmsg.data.corpId,
        },
      });
      init(Vue, App, initQasar);
    } else {
      alert("鉴权失败");
    }

  });
} else {
  init(Vue, App, initQasar);
}









