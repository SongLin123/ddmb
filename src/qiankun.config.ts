/*
 * @Author: your name
 * @Date: 2019-12-16 16:17:31
 * @LastEditTime : 2019-12-18 17:43:44
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tiger-prawn-mbfw\src\qiankun.config.ts
 */
import router from './config/routes';
import store from './store';
import { asideMenuConfig } from "./config/menu";

import './styles/quasar.styl'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'


// 以下为qiankun框架配置
__webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__!;

import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun';
import fetch from 'isomorphic-fetch';


export const init = async (Vue: any, App: any, callback: (a: any) => void) => {
    let app: any = null;
    const request = (url: any) =>
        fetch(url, {
            referrerPolicy: 'origin-when-cross-origin',
        });

    function render({ appContent, loading }: { appContent?: string, loading: boolean }) {

        if (!app) {

            // new Vue前执行的函数
            callback(Vue);
            app = new Vue({
                el: '#container',
                store,
                router,
                data() {
                    return {
                        content: appContent,
                        loading,
                    };
                },
                render(h: any) {
                    return h(App, {
                        props: {
                            content: (this as any).content,
                            loading: (this as any).loading,
                        },
                    });
                },
            });
        } else {

            app.content = appContent;
            app.loading = loading;
        }
    }

    function genActiveRule(routerPrefix: string) {
        return (location: any) => location.pathname.startsWith(routerPrefix);
    }



    runAfterFirstMounted(() => console.info('first app mounted'));


    render({ loading: true });

    const data: any[]  = (await asideMenuConfig() as any).menu;
    const apps = [];
    for (const item of data) {
        if (item.appPath) {
            apps.push({
                    name: item.appName,
                    entry: `/childApp/${item.appName}/`,
                    render,
                    activeRule: genActiveRule(`/${item.appName}`),
                });
            }
        }


    registerMicroApps(apps);
    start({ fetch: request });

    return app;
};
