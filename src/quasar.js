/*
 * @Author: your name
 * @Date: 2019-12-14 15:31:18
 * @LastEditTime: 2019-12-16 17:38:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn-mbfw\src\quasar.js
 */
// import Vue from 'vue'



import { Quasar } from 'quasar'

export const initQasar = (Vue) => {

  Vue.use(Quasar, {
    config: {},
    components: { /* not needed if importStrategy is not 'manual' */ },
    directives: { /* not needed if importStrategy is not 'manual' */ },
    plugins: {
    }
  })
}

