<!--
 * @Author: your name
 * @Date: 2019-12-14 15:22:42
 * @LastEditTime : 2020-01-08 14:45:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn\tiger-prawn-mbfw\src\components\playground.vue
 -->
<template>
  <!-- <q-page class="flex flex-center"> -->
  <!-- <img alt="Quasar logo" src="../assets/logo.png"> -->
  <q-page>
    <div v-html="content"></div>
    <div v-if="!content" style="padding:10px">
      <div class v-for="groupItem in group" :key="groupItem.id">
        <q-bar class="bg-white">
          <div class="col text-left text-subtitle1">{{groupItem.name}}</div>
        </q-bar>
        <div class="flex row items-center" style="padding:10px 0 10px 0">
          <q-item
            v-for="item in asideMenu"
            v-show="item.appPath&&(item.groupId===groupItem.id)"
            :key="item.path"
            clickable
            tag="a"
            @click="goto(item.name,item.appName)"
          >
            <q-item-section>
              <q-item-label>
                <q-avatar rounded>
                  <img :src="`/logoIcon/${item.appName}.jpg`" />
                </q-avatar>
              </q-item-label>

              <q-item-label
                class="text-caption text-center text-justify"
                style="width:100%;"
              >{{item.name}}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </div>
  </q-page>

  <!-- </q-page> -->
</template>

<style scoped>
</style>

<script>
import { asideMenuConfig } from "../config/menu";
export default {
  name: "playground",
  props: {
    loading: Boolean,
    content: String
  },
  data() {
    return {
      asideMenu: {},
      group: []
    };
  },
  async created() {
    const menuConfig = await asideMenuConfig();
    this.asideMenu = menuConfig.menu;
    this.group = menuConfig.group;
  },
  methods:{
    // goto(data,res){
    //   console.log(data,res)
    // }
  }
};
</script>
