<template>
  <div class="level" @click="dianji">
    <i :class="count" class="levelImg"></i>
  </div>
</template>

<script>
export default {
    name: 'level',
    props: ['countNum'],
    computed: {
        count() {
            return 'count-' + this.countNum;
        }
    },
    methods: {
        dianji() {
            console.log(this.countNum)
        }
    }
    // data() {
    //     return {
    //         count: 'count' + this.countNum
    //     }
    // }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .level
        position: relative
        float: right
        height: 20px
        .levelImg
            background-image: url(../assets/image/difficulty.png)
            background-repeat: no-repeat
            background-size: 100%
            display: inline-block
            height: 5px
            width: 48px
        .count-0
            background-position: 0 0
        .count-1
            background-position: 0 0
        .count-2
            background-position: 0 -12px
        .count-3
            background-position: 0 -23px
        .count-4
            background-position: 0 -34px
        .count-5
            background-position: 0 -45px
</style>
