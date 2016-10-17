import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from './app.vue'
import Home from './views/home-view.vue'

import Hipervideo from './views/hipervideo-view.vue'


const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home,
    children: [
      { 
        path: ':id',
        children: [{
          path: 'descricao'
        },
        {
          path: 'info'
        }]
      }
    ]
  },
  { path: '/hipervideo/:id', component: Hipervideo },
  { path: '*', redirect: '/home' }
]

const router = new VueRouter({
  routes // short for routes: routes
})

const app = new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')


