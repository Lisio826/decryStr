import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/globals.scss'

import App from './App'
import router from './router'
import store from './store'
import mixins from './mixins'

Vue.mixin(mixins)
Vue.use(ElementUI, axios)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype["$elementMessage"] = function (msg, type) {
  this.$message({
    showClose: true,
    message: msg,
    type: type,
    center: true,
    duration: 5000,
    customClass: 'eleClass'
  })
}

/* eslint-disable no-new */
new Vue({
  components: {App},
  router,
  store,
  template: '<App/>'
}).$mount('#app')
