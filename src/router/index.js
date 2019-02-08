import Vue from 'vue'
import Router from 'vue-router'
import Entry from '@/components/entry'
import Memory from '@/components/memory'
import List from '@/components/wordList'
import Classification from '@/components/classification'
import FindWord from '@/components/findWord'
import wordDetail from '@/components/wordDetail'
// import SiJi from '@/components/jet4'
// import LiuJi from '@/components/jet6'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'main',
      component: Entry
    },
    {
      path: '/memory',
      name: 'memory',
      component: Memory
    },
    {
      path: '/wordList/:name',
      name: 'wordList',
      component: List
    },
    {
      path: '/classification/:name',
      name: 'classification',
      component: Classification
    },
    {
      path: '/FindWord',
      name: 'FindWord',
      component: FindWord
    },
    {
      path: '/wordDetail',
      name: 'wordDetail',
      component: wordDetail
    }
  ]
})
