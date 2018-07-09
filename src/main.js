import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMq from 'vue-mq';
import 'normalize.css';

Vue.use(
  VueMq, {
  breakpoints: { // default breakpoints - customize this
    xs: 480,
    sm: 768,
    md: 996,
    lg: Infinity,
  }
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
