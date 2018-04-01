import Vue from 'vue'
import Router from 'vue-router'
import Memory from '@/components/memory'
import List from '@/components/wordList'
import GaoKao from '@/components/gaokao'
import SiJi from '@/components/jet4'
import LiuJi from '@/components/jet6'

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
    },
    {
      path: '/gaokao',
      name: 'gaokao',
      component: GaoKao
    },
    {
      path: '/siji',
      name: 'siji',
      component: SiJi
    },
    {
      path: '/liuji',
      name: 'liuji',
      component: LiuJi
    }
  ]
})
