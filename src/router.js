import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Issues from './components/Issues.vue'
import Detail from './components/Detail.vue'
import Label from './components/Label.vue'
import About from './components/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'issues',
      component: Issues
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/label/:name',
      name: 'label',
      component: Label
    }
  ]
})
