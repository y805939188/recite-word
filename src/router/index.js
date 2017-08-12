import Vue from 'vue'
import Router from 'vue-router'
import Memory from '@/components/memory'
import List from '@/components/wordList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/memory',
      name: 'memory',
      component: Memory
    },
    {
      path: '/wordList',
      name: 'list',
      component: List
    }
  ]
})
