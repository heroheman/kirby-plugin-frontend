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
  mode: 'history',
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
      path: '/list/:type/:page?',
      name: 'list',
      component: List
    },
    {
      path: '/list/:type/:query/:page?',
      name: 'list-search',
      component: List
    },
    {
      path: '/list/all/:page',
      name: 'list-all-page',
      component: List
    }
  ]
})

  // /list/all/32
  // /list/:type/:page

  // /list/Panel/2
  // /list/Panel-Screenshot/2
  // /list/search/Suchbegriff/3
  // /list/:type/:page

  // /detail/:id
