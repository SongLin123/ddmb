<!--
 * @Author: your name
 * @Date: 2019-12-14 15:22:42
 * @LastEditTime : 2019-12-18 17:51:03
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn\tiger-prawn-mbfw\src\App.vue
 -->
<template>
  <q-layout view="hHh Lpr lFf">


    <q-page-sticky v-if="!ddVersion" style="z-index:999" position="bottom-left" :offset="[-20, 18]">
      <q-btn @click="DrawerOpen = !DrawerOpen" class="button" round color="accent">
        <q-icon class="offset" name="keyboard_arrow_right" />
      </q-btn>
    </q-page-sticky>
    <q-drawer
      side="right"
      v-model="DrawerOpen"
      show-if-above
      bordered
      :width="200"
      content-class="bg-grey-2"
    >
      <q-img src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <!-- <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </div> -->
      </q-img>
      <q-list>
        <q-item
          v-for="item in asideMenuConfig.menu"
          :key="item.path"
          clickable
          tag="a"
          @click="goto(item.name,item).then(()=>DrawerOpen=false)"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{item.name}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <transition name="fade" mode="out-in">
        <playground :content="content" :loading="loading" />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import playground from "./components/playground.vue";
import { asideMenuConfig } from "./config/menu";
import * as dd from "dingtalk-jsapi";

export default {
  name: "LayoutDefault",

  components: {
    playground
  },
  props: {
    loading: Boolean,
    content: String
  },
  data() {
    return {
      ddVersion: dd.env.version,
      asideMenuConfig: {},
      DrawerOpen: false
    };
  },
  async created() {


    // TODO 路由跳转
    // window.onpopstate = () => {
    //     console.log(history.state)
    //     history.pushState(
    //       {},
    //       "",
    //       `?dd_nav_bgcolor=FF5E97F6`
    //     );

    // };
    
    this.asideMenuConfig = await asideMenuConfig();
    if (dd.env.version) {
      const that = this;
      dd.ready(() => {
        //   // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
        //   dd.runtime.permission.requestAuthCode({
        //     corpId: 'corpid',
        //     onSuccess: (result: any) => {
        //       /*{
        //           code: 'hYLK98jkf0m' //string authCode
        //       }*/
        //       console.log(result)
        //       init()
        //     },
        //     // onFail: function (err) { }

        //   });

        // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
        dd.biz.navigation.setTitle({ title: "首页" });

        dd.biz.navigation.setMenu({
          backgroundColor: "#ADD8E6",
          textColor: "#ADD8E611",
          items: [
            {
              id: "1",
              iconId: "more",
              text: "首页"
            }
          ],
          onSuccess() {
            that.DrawerOpen = !that.DrawerOpen;
          }
        });
      });
    }
  },
  methods: {}
};
</script>

<style scoped>
.button {
  position: relative;
}
.offset {
  position: absolute;
  right: 0;
}
</style>
<style>
.fixed-left {
  left: -20px !important;
}
</style>
