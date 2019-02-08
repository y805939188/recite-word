// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 艾宾浩斯记忆曲线
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入axios
import axios from 'axios'
// 这个插件作用是把vue和axios链接在一起
import VueAxios from 'vue-axios'
// import VueResource from 'vue-resource'
import '../static/css/animate.css'
window.startTime = Date.now()
// Vue.use(VueResource)
// use的原理是判断vue-axios中是否有install方法
// 然后把axios作为参数传到install方法中
// 在install方法中将axios挂载到vue的原型上
Vue.use(VueAxios, axios)
// 手动推入一条路由
// 会直接跳转到查询页面
router.push('FindWord')


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
