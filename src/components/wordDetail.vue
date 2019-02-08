<template>
  <div id="app2">
    <loadingSVG v-if="isShowLoading"></loadingSVG>

    <header id="entry-title">
      <div id="title-wrapper">
        <span class="study-time"><font size="4" @click="back">←</font></span>
      </div>
    </header>
    <div id="word-undefined" v-if='isUndefinedWord'>
      <p>未查询到该单词</p>
      <find></find>
    </div>
    <div id="word-wrapper" v-show="!isUndefinedWord">
      <div class="content">{{word.w}}</div>
      <div class="voice">
        <span class="en">
          英 /{{word.en}}/
          <img src="../../static/image/dict_pronounce_icon_normal.png" alt="" @click="handleVoice">
        </span>
        <span class="us">
          美 /{{word.us}}/
          <img src="../../static/image/dict_pronounce_icon_normal.png" alt="" @click="handleVoice">
        </span>
      </div>
      <div class="detail">
        <p>释义:</p>
        <ul>
          <li v-for="(meaning, index) in word.p" :key="index">{{meaning.c}} {{meaning.p}}</li>
        </ul>
      </div>
      <div class="classify">
        <span v-for="(classify, index) in word.classification" :key="index">{{classify}} {{index === word.classification.length - 1 ? '' : '|'}}</span>
      </div>
      <div class="sentence">
        <p>例句:</p>
        <ul>
          <li v-for="(sen, index) in word.sen" :key="index">
            <p><font color="#000">{{index + 1}}</font>. {{sen.c}}</p>
            <p v-html="mySenSplit[index]"></p>
          </li>
        </ul>
      </div>
      <div class="syn">
        <p>近义词</p>
        <div v-for="(syn, index) in word.syn" :key="index">
          <p>{{syn.bisp}}</p>
          <p>{{syn.w}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FIND_WORD } from '../url/index.js'
import loadingSVG from './loading.vue'
import find from './find.vue'
import { EventBus } from '../bus/event-bus.js'
import { senSplit, wordVoice } from '../utils/utils.js'
export default {
  name: 'app',
  components: {
    loadingSVG,
    find
  },
  created() {
    let word = this.$route.query.word
    this.axios.get(FIND_WORD, {
      params: {
        w: word
      }
    }).then((res) => {
      if (res.data.code === 30) {
        let _res = res.data.data.res
        let _word = _res.filter((item) => {
          return item.w === word
        })
        if (_word[0]) {
          this.word = _word[0]
          this.isUndefinedWord = false
        }
        this.isShowLoading = false
        console.log(this.word)
      } else if (res.data.code === 29) {
        this.isShowLoading = false
        this.isUndefinedWord= true
      }
    })
  },
  data() {
    return {
      res: [],
      word: {},
      isShowLoading: true,
      isUndefinedWord: true
    }
  },
  methods: {
    back() {
      // 返回上一页
      this.$router.go(-1)
    },
    handleVoice() {
      wordVoice(this.word.w)
    }
  },
  computed: {
    mySenSplit() {
      return senSplit(this.word)
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #entry-title
    border-bottom: 1px solid #80808021
    #title-wrapper
      position: relative
      height: 6vh
      span
        position: absolute
        display: block
        top: 50%
        transform: translate(0, -50%)
      span:nth-of-type(1)
        margin-left: 20px
        color: #848282
        left: 0
        span
          color: grey
      span:nth-of-type(2)
        font-size: 24px
        margin-right: 20px
        color: #808080
        right: 0
  #word-undefined
    position: absolute
    left: 0
    top: 10%
    right: 0
    bottom: 0
    width: 200px
    height: 200px
    margin: auto
    fill: rgba(0,0,0,0.2)
    z-index: 99999
    p
      font-size: 28px
      color: #000000ad
      margin-top: 33%
  #word-wrapper
    background-color: #fff
    margin: 3%
    padding: 1%
    border-radius: 10px
    .content
      margin: 5%
      color: #000
      font-size: 34px
      font-weight: 600
    .voice
      margin-left: 3%
      margin-bottom: 10%
      span
        color: #00000085
        float: left
        margin-right: 20px
      img
        width: 24px
        height: 24px
        vertical-align: text-top
    .voice:after
      clear: both
      content: ''
      display: block
    .detail
      margin: 3%
      p
        font-weight: bolder
        color: #279aec
        margin-bottom: 3%
      ul > li
        color: #000
        margin-bottom: 5%
    .classify
      margin: 0 5% 10% 0
      font-size: 13px
      span
        margin-left: 5px
    .sentence
      margin-bottom: 5%
      line-height: 18px
      & > p
        font-weight: bolder
        color: #279aec
        margin: 0 0 3% 3%
      li
        margin: 0 0 3% 3%
        p
          margin-bottom: 2%
          color: #000000b5
          em
            color: #9c6
    .syn
      & > p
        font-weight: bolder
        color: #279aec
        margin: 0 0 3% 3%
      div > p
        margin: 0 0 2% 3%
        color: #000000b5
</style>
