import Vue from 'vue'
import axios from 'axios'
import db from './datastore'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

import './lib/elementui.js'
import './assets/less/reset.less'

Vue.use(VueLazyload)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.prototype.$db = db
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
