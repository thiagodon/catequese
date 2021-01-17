import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueFire from 'vuefire'
import './db'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase/app'
import moment from 'moment'

require('firebase/auth');

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueFire)

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
});

Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
});

Vue.config.productionTip = false

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})