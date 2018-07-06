import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Issues from './components/Issues.vue'
import List from './components/List.vue'
import Detail from './components/Detail.vue'
import About from './components/About.vue'
import Privacy from './components/Privacy.vue'

Vue.use(Router)

export default new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
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
      path: '/privacy',
      name: 'privacy',
      component: Privacy
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
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
