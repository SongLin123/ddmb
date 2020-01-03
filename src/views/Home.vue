<!--
 * @Author: your name
 * @Date: 2019-12-14 15:22:42
 * @LastEditTime: 2019-12-14 16:49:34
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn\tiger-prawn-mbfw\src\views\Home.vue
 -->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <playground msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import playground from '@/components/playground.vue'

export default {
  name: 'home',
  components: {
    playground
  }
}
</script>
