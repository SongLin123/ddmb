/*
 * @Author: your name
 * @Date: 2019-12-13 15:37:21
 * @LastEditTime : 2019-12-18 17:43:13
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn-adfw\src\config\menu.js
 */
// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

import Axios from 'axios';



export const asideMenuConfig = async () => {
  const res = await Axios.get('/menu.json');
  return res.data;
};
