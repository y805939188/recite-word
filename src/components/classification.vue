<template>
  <div id="app3">
    <div id="title"> 
      <i class="back" @click="back"></i>
      <span class="titl">{{classificationObj.title}}</span>
      <div class="wordList">
        <router-link class="list" to="/wordList" v-show="!reveal">词汇表</router-link>
        <i class="DNtype" v-show="reveal"></i>
      </div>
    </div>
    <div id="content"  v-show="reveal">
      <div class="bookTitle">
        <div class="titleText">{{classificationObj.title}}</div>
        <div class="vocabulary">
          词汇量: <span>{{classificationObj.count}}</span>
        </div>
      </div>
      <div class="bookRecite">
        <span>乱序背诵全部词汇，遵循记忆曲线，科学记单词，从背过到熟记，层层深入至掌握</span>
        <router-link class="reciteWord" to="/memory"></router-link>
      </div>
      <div class="bookList">
        <span>按顺序浏览单词，提供单词释义、发音、例句、用法、真题，全方位助你逐个击破</span>
        <router-link class="listWord" :to="{name: 'wordList', params: {name: 'vocabularyList'}}"></router-link>
      </div>
      <div class="bookNote">
        <span>记录未熟背的单词，提供单词释义、发音、例句、用法、真题等。助你复习与巩固。</span>
        <router-link class="wordNote" :to="{name: 'wordList', params: {name: 'vocabularyNote'}}"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ADD_TO_NOTE } from '../url/index.js'
import { EventBus } from '../bus/event-bus.js'
const wordData = require('../../static/data/wordData.json')
EventBus.$on('invokeWordData', (instance) => {
  instance.wordData = wordData
})
export default {
  name: 'app',
  data() {
    return {
      reveal: {
        type: Boolean,
        default: true
      },
      classificationObj: {}
    }
  },
  methods: {
    back() {
      //$router.go(num) 这个方法的参数是一个整数 意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)
      //$router.push 约等于router-link标签中的to,to会在内部隐式调用push。
      //这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL
      //$router.replace 它不会向 history 添加新记录 直接替换掉当前的 history 记录。
      //$route 可以获取当前路由地址等等东西, $router可以改变路由等
      this.$router.go(-1)
    }
  },
  created() {
    EventBus.$emit('invokeListAndTitle', this)
    this.classificationObj = this.classification.filter((item) => {
      return item.name === this.classificationName
    })[0]
    EventBus.$on('invokeTitleInMemory', (instance) => {
      instance.classificationObj = this.classificationObj
    })
    this.axios.get(ADD_TO_NOTE, {
      params: {
        classification: this.classificationObj.name
      }
    }).then((res) => {
      console.log(res)
      EventBus.$on('invokeAddedToNoteList', (instance) => {
        instance.classificationObjWordNote = res.data.data
      })
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  body
    background-color: #e9e6e2
    #title
      height: 50px
      line-height: 50px
      color: #fff
      background: rgba(44,44,44,1)
      text-indent: 60px
      top: 0
      left: 0
      width: 100%
      border: none
      text-shadow: 1px 1px 3px rgba(33,33,33,1)
      z-index: 2
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
      .back
        background: url(../../static/image/back.jpg) 2px 0 no-repeat
        background-size: 100% 100%
        height: 15px
        width: 15px
        display: block
        position: absolute
        left: 20px
        top: 17px
        cursor: default
      .wordList
        float: right
        height: 50px
        width: 130px
      .wordList .list
        float: left
        background: url(../../static/image/dict_list_icon_normal.png) 32px 0px no-repeat
        background-size: 24px 24px
        padding: 0px -22px
        color: #fff
        line-height: 21px
        height: 24px
        width: 60px
        margin-top: 13px
      .wordList .DNtype
        background: url(../../static/image/icon_more_normal.png) 0 0 no-repeat;
        background-size: 24px 24px;
        float: right;
        height: 24px;
        margin: 12px;
        width: 24px;
    #content
      margin: 12px
      .bookTitle
        border-bottom: 1px dashed #B6AFA2
        padding: 0 12px
        .titleText
          color: #4E4C4A
          font-weight: bold
          font-size: 18px
          height: 24px
          line-height: 24px
        .vocabulary
          margin: 10px 0 24px
          color: #B6AFA2
          font-size: 15px
          height: 20px
          line-height: 20px
          span
            margin-left: 3px
            color: #9C0
            font-size: 15px
      .bookRecite
        margin: 20px 0
        span
          display:block
          margin: 0 16px 20px
          padding-left: 54px
          background: url(../../static/image/icon_recite_normal.png) 0 0 no-repeat
          color: #B6AFA2
          font-size: 15px
        .reciteWord
          background: url(../../static/image/btn_word_normal.png) 0 0 no-repeat
          background-size: 100% 100%
          margin: 0 auto
          display: block
          width: 100%
          height: 41px
      .bookList
        margin: 20px 0
        span
          display:block
          margin: 0 16px 20px
          padding-left: 54px
          background: url(../../static/image/dict_list_icon_normal.png) 0 0 no-repeat
          color: #B6AFA2
          font-size: 15px
        .listWord
          background: url(../../static/image/btn_glossary_normal.png) 0 0 no-repeat
          background-size: 100% 100%
          margin: 0 auto
          display: block
          width: 100%
          height: 41px
      .bookNote
        margin: 20px 0
        span
          display:block
          margin: 0 16px 20px
          padding-left: 54px
          background: url(../../static/image/wordsbook_add_night_normal2.png) 0 0 no-repeat
          color: #B6AFA2
          font-size: 15px
        .wordNote
          background: url(../../static/image/btn_book_normal.png) 0 0 no-repeat
          background-size: 100% 100%
          margin: 0 auto
          display: block
          width: 100%
          height: 41px
</style>
