import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Vuetify from 'vuetify'
import vuetify from '@/plugins/vuetify'
import * as echarts from 'echarts'
import './assets/iconfont/iconfont.css';// 全局主题样式
//import marked from 'marked';

Vue.use(Vuetify);
Vue.use(ElementUI);
Vue.use(mavonEditor);
//Vue.use(marked)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
///
// 指定 axios 发送请求的目标后端地址的根路径
// 一般为后端服务器IP+端口；若有部署域名则可以是域名地址；
// 此处假设在本地同时运行前后端，后端地址为 http://localhost:8000

//axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//axios.defaults.baseURL = 'http://101.42.224.73:8000/';
axios.defaults.baseURL = 'https://www.zhoues.com/api/';

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

/*import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-np
//全局配置
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
