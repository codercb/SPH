import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//引入mock虚拟数据
import '@/mock/mockServe'
//统一引入api接口
import * as API from '@/api'
//按需引入elementUI组件
import {Button,MessageBox} from 'element-ui'
//第一种注册方式
Vue.use(Button)
//第二种注册方式，挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入vue-lazyload插件
import VueLazyload from 'vue-lazyload'
//注册插件
const loadimage = require('@/assets/img/loading.gif')
Vue.use(VueLazyload, {
  loading: loadimage,
})

//引入vee-validate
import '@/untils/validate'

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    //全局事件总线
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  }
}).$mount('#app')
