<template>
  <div id="find-word">
    <findSVG></findSVG>
    <div class="find-input">
      <input type="text" v-model="q" @input="handleFindWord" @blur="handleBlur">
      <span @click="handleFindClick">
        <img src="../../static/image/(find)_SFont.CN.png" alt="">
      </span>
      <div class="finded-list" v-show="tidy_res.length !== 0">
        <ul>
          <li v-for="(word, index) in tidy_res" :key="index" @click="handleFindClick(word.w)">
            {{word.w}} &nbsp;&nbsp; <font color="#1c6d9c">{{word.bisp}}</font>
          </li>
        </ul>
      </div>
    </div>
    <div class="to-recite-word">
      <!-- tag属性是告诉routerlink标签最后要渲染成div标签 -->
      <router-link to="/main" tag="div">去背单词</router-link>
    </div>
  </div>
</template>

<script>
import { FIND_WORD } from '../url/index.js'
import findSVG from './find'
import { EventBus } from '../bus/event-bus.js'
import { debounce } from '../utils/utils.js'

export default {
  name: 'app',
  components: {
    findSVG
  },
  data() {
    return {
      q: '',
      tidy_res: [],
      res: []
    }
  },
  methods: {
    handleBlur() {
      this.res = this.tidy_res = []
    },
    handleFindWord: debounce(function () {
      if (this.q.trim() === '') return
      this.axios.get(FIND_WORD, {
        params: {
          w: this.q
        }
      }).then((res) => {
        if (res.data.code === 30) {
          this.tidy_res = res.data.data.tidy_res
          this.res = res.data.data.res
        } else if (res.data.code === 29) {
          console.log('未查询到该单词')
        }
      })
    }, 200),
    handleFindClick(word) {
      console.log(word)
      if (this.q.trim() === '') return
      this.$router.push({
        path: '/wordDetail',
        query: {
          word,
        }
      })
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  *
    text-decoration : none
    list-style: none
  .find-input
    position: relative
    top: 55vh
    input
      font-size: 20px;
      letter-spacing: 1px;
      display: block;
      position: absolute;
      z-index: 99999;
      height: 30px;
      width: 60%;
      border-radius: 10px;
      border: none;
      box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.1);
      left: 50%;
      margin-left: -30%;
      padding-left: 10px;
      padding-right: -10px;
    span
      display: block;
      position: absolute;
      width: 25px;
      height: 25px;
      right: 20%;
      z-index: 9999999;
      margin-top: 1%;
      img
        width: 100%
        height: 100%
    div
      background-color: #fff
      position: absolute
      width: 60%
      left: 50%
      margin-left: -28%
      z-index: 999999
      margin-top: 10%
      padding: 5px 0
      border-bottom-left-radius: 5px
      border-bottom-right-radius: 5px
      ul > li
        margin: 5px
        padding-bottom: 5px
        font-size: 14px
        color: #000
        border-bottom: 1px solid #55555552
        overflow: hidden
        text-overflow:ellipsis
        white-space: nowrap
      ul > li:hover
        background-color: #B2B2B2
  .to-recite-word
    background-color: #ccc;
    margin: 0 auto;
    display: inline-block;
    padding: 12px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 10%;
    border-radius: 10px;
    div
      color: #fff;
</style>