import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2)
Vue.config.productionTip = false

new Vue({
  created() {
    this.$store.dispatch('searchUsers')
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
