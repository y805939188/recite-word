<template>
  <div class="list">
    <div id="title"> 
      <i class="back" @click="back"></i>
      <span class="titl">{{classificationObj.title}}</span>
      <div class="wordList">
        <!-- <router-link class="list" to="/wordList">词汇表</router-link> -->
        <i class="DNtype"></i>
      </div>
    </div>
    <ul v-show="isShow" class="listUl">
      <li v-for="(listLi, index) in Math.ceil(this.isNote ? classificationObjWordNote.length / 40 : wordData.data.length / 40)" :key="listLi.value" @click="listDisappear(index)">
        <a v-show="isShow">
          <h1>List {{index+1}}</h1>
          <p>{{index + 1 > (classificationObjWordNote.length / 40) ? (classificationObjWordNote.length % 40) : 40 }}词</p>
        </a>
      </li>
    </ul>
    <listDetailed v-show="Show" :arrIndex="this.Index" :wordData="this.isNote ? classificationObjWordNote : this.wordData"></listDetailed>
  </div>
</template>

<script>
import listDetailed from './listDetailed'
import { EventBus } from '../bus/event-bus.js'
export default {
  name: 'list',
  data () {
    return {
      isShow: true,
      Show: false,
      Index: 0,
      wordData: [],
      classificationObjWordNote: [],
      isNote: false
    }
  },
  created() {
    EventBus.$emit('invokeTitleInMemory', this)
    EventBus.$emit('invokeWordData', this)
    EventBus.$emit('invokeAddedToNoteList', this)
    if (this.$route.params.name === 'vocabularyNote') {
      this.isNote = true
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    listDisappear(index) {
      this.isShow = false;
      this.Show = true;
      this.Index = index;
    }
  },
  components: {
    listDetailed
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
      .list
        background-color: #e9e6e2
        .listUl
          margin: 10px 0 0 0
          padding: 0
          width: 100%
          li
            float: left
            margin: 0
            padding: 0
            width: 33.3%
            overflow-x: hidden
            a
              background-position: 100% 63px
              display: block
              margin: 10px auto
              width: 90px
              height: 90px
              -webkit-box-sizing: border-box
              padding: 15px 0 0 10px
              background: #fff url(../../static/image/mark.png) no-repeat 100% -47px
              background-size: 30%
              -webkit-box-shadow: 0px 2px 6px rgba(0,0,0,.3)
              -webkit-border-radius: 2px
              h1
                color: #4E4C4A
                font-size: 18px
                font-family: italic
                line-height: 20px
              p
                color: #4E4C4A
                margin: 0
                line-height: 30px
</style>
