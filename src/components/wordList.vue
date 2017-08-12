<template>
  <div class="list">
    <ul v-show="isShow" class="listUl">
      <li v-for="(listLi, index) in 96" :key="listLi.value" @click="listDisappear(index)">
        <a v-show="isShow">
          <h1>List {{index+1}}</h1>
          <p>40词</p>
        </a>
      </li>
    </ul>
    <listDetailed v-show="Show" :arrIndex="this.Index" :wordData="this.wordData"></listDetailed>
  </div>
</template>

<script>
import listDetailed from './listDetailed'
export default {
  name: 'list',
  data () {
    return {
      isShow: true,
      Show: false,
      Index: 0
    }
  },
  created() {
      this.$emit("update:disappear",false);
  },
  methods: {

    listDisappear(index) {
      this.isShow = false;
      this.Show = true;
      this.Index = index;
    }
  },
  props: ["wordData", "disappear"],
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
              background: #fff url(../assets/image/mark.png) no-repeat 100% -47px
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
