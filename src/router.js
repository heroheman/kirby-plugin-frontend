import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Issues from './components/Issues.vue'
import List from './components/List.vue'
import Detail from './components/Detail.vue'
import Label from './components/Label.vue'
import About from './components/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/list/all'
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
    },
    {
      path: '/list/:type/',
      name: 'list-label',
      component: List
    },
    {
      path: '/list/:type/:page',
      name: 'list-label-page',
      component: List
    },
    {
      path: '/search/:query/',
      name: 'search',
      component: List
    },
  ]
})

  // /list/all/32
  // /list/:type/:page

  // /list/Panel/2
  // /list/Panel-Screenshot/2
  // /list/:type/:page

  // /detail/:id
