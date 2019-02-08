<template>
  <div id="app2">
    <loadingSVG v-if="isShowLoading"></loadingSVG>
    <!-- 在组件内部通过this.$emit('handleClickBtnAfter') 可以触发对应方法 -->
    <myRegister v-if="isRegiseter" clsName="ding" @handleClickBtnAfter="handleClickBtnAfter"></myRegister>

    <header id="entry-title" v-if="isContentShow">
      <div id="title-wrapper">
        <span class="study-time"><font size="4" @click="back"><</font> 已经学习了 <font size="4" color="rgb(107, 102, 102)">{{studyTime}}</font>分钟</span>
        <span class="download" @click="handleClickPlus">+</span>
      </div>
    </header>

    <div id="entry" v-if="isContentShow">
        <div class="book-wrapper">
          <div class="book-row" v-for="(row, index) in (Math.ceil(bookList.length / 3))" :key="index">
            <div class="book-item" :class="index2 === 1 ? 'book-item2' : ''" v-for="(item, index2) in bookList.slice(index * 3, index * 3 + 3)" :key="index2">
              <router-link class="word" :to="{name: 'classification', params: {name: item.name}}">{{item.title}}</router-link>
            </div>
          </div>
        </div>
    </div>
    <footer id="sole" v-if="isContentShow">
      <span>您已添加 <font size="4" color="rgb(107, 102, 102)">{{bookList.length}}</font> 本书</span>
      <span class="nick" v-show="isContentShow">{{auth_nick}}, <font @click="handleLoginout" color="#279aec">注销</font></span>
    </footer>
  </div>
</template>

<script>
import { INVOKE_CLASSIFICATION_LIST, LOGIN_OUT } from '../url/index.js'
import myRegister from './register.vue'
import loadingSVG from './loading.vue'
import { EventBus } from '../bus/event-bus.js'
export default {
  name: 'app',
  components: {
    myRegister,
    loadingSVG
  },
  created() {
    let _authorization = localStorage.getItem('authorization')
    // this.isRegiseter = true
    // this.isShowLoading = false
    this.axios.get(INVOKE_CLASSIFICATION_LIST, {
      headers: {
        Authorization: _authorization
      }
    }).then((res) => {
      // console.log(res)
      if (res.data.code === 22) {
        // 让axios每次都默认发送这个请求头
        this.axios.defaults.headers.common['Authorization'] = _authorization
        this.isContentShow = true
        this.bookList = res.data.data
        // | 0 就是去掉小数点后面的数字
        this.studyTime = ((Date.now() - startTime) / (1000 * 60)) | 0
      } else {
        this.isRegiseter = true
      }
      this.isShowLoading = false
      // console.log(this.bookList)
    })
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`

    // $on 相当于把事件绑定到eventbus中
    // 在其他组件中 可以通过 $emit触发
    EventBus.$on('invokeListAndTitle', (instance) => {
      instance.classification = this.bookList
      instance.classificationName = to.params.name
    })
    next()
  },
  data() {
    return {
      isContentShow: false,
      isRegiseter: false,
      isShowLoading: true,
      studyTime: 0,
      bookList: [],
      auth_nick: localStorage.getItem('auth_nick') || '',
    }
  },
  methods: {
    back() {
      // 返回上一页
      this.$router.go(-1)
    },
    handleClickPlus() {

    },
    handleClickBtnAfter() {
      this.isShowLoading = true
      this.axios.get(INVOKE_CLASSIFICATION_LIST).then((res) => {
        // console.log(res)
        if (res.data.code === 22) {
          this.isRegiseter = false
          this.isContentShow = true
          this.bookList = res.data.data
          // | 0 就是去掉小数点后面的数字
          this.studyTime = ((Date.now() - startTime) / (1000 * 60)) | 0
        } else {
          this.isRegiseter = true
        }
        this.isShowLoading = false
      })
    },
    handleLoginout() {
      this.axios.put(LOGIN_OUT).then((res) => {
        if (res.data.code === 6) {
          this.$router.push('FindWord')
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  body
    background-color: rgba(0, 0, 0, 0.06)
    #entry-title
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
    #entry
      text-align: center
      .word
        display: block
        margin: 10% 0
        text-decoration: none
      .book-wrapper
        .book-row
          padding-top: 20px
          height: 150px
          // text-align-last: justify;
          padding-left: 20px
          padding-right: 20px
          box-shadow: 0px 30px 70px #88888873;
          margin-bottom: 20px
          .book-item
            border-radius: 5px
            margin-top: 5%;
            display: inline-block
            background-color: #80808042;
            height: 75%;
            width: 22%;
            margin-top: 9%;
            border: 5px solid #fff;
          .book-item2
            margin: 0 10%
    #sole
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      padding-bottom: 20px;
      span:nth-of-type(1)
        color: #848282;
      span:nth-of-type(2)
        position: absolute;
        right: 3%;
        bottom: 20%;
        font-size: 14px;

    


  
</style>
