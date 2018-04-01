<template>
  <div id="app">
    <div id="entry">

        <router-link class="word" to="/gaokao" v-show="isShow">高考词汇</router-link>


        <router-link class="word" to="/siji" v-show="isShow">四级词汇</router-link>

        <router-link class="word" to="/liuji" v-show="isShow">六级词汇</router-link>

    </div>
    <router-view :isShow.sync="isShow"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      type: Boolean,
      isShow: true
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #entry
    text-align: center
    .word
      display: block
      margin: 10% 0
      text-decoration: none

  
</style>
