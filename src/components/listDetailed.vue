<template>
  <div class="listDetailed">
    <ul>
        <li v-for="(word, index) in indexWord" :key="word.value">
            <a>{{word.w}}</a>
            <div>
                <a>
                    <span></span>
                    <span>[美{{word.en}}]</span>
                </a>
                <span>/</span>
                <a>
                    <span></span>
                    <span>[英{{word.us}}]</span>
                </a>
            </div>
             <a>
                <span>{{word.bisp}}</span>
            </a> 
        </li> 
    </ul>    
  </div>
</template>

<script>
var my_word_data = require('../../static/data/wordData.json');
export default {
  name: 'list',
  data () {
    return {
      wordArr: [],
      num: this.arrIndex
    }
  },
  created() {
    //   this.wordData = my_word_data
  },
  computed: {
    indexWord() {
        let wordData = this.wordData instanceof Array ? this.wordData : this.wordData.data
        return wordData.filter(function(value, index) {
                return index <= (this.arrIndex * 40 + 39) && index >= this.arrIndex * 40
        }, this);
    }
  },
  methods: {
    
  },
  props: ["wordData", "arrIndex"]
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .listDetailed
        background-color: #fff
        ul
            li
                display: block
                width: 100%
                // padding-left: 20px
                border-bottom: 1px solid #dad5cb
                position: relative
                a:nth-of-type(1)
                    margin-left: 20px
                    vertical-align: middle
                    margin-right: 45px
                    display: block
                    color: #4e4c4a
                    font-size: 18px
                    font-weight: bold
                    padding-top: 16px
                div
                    font-size: 15px
                    margin-left: 20px
                    color: #b6afa2
                    padding-right: 45px
                    text-overflow: ellipsis
                    white-space: nowrap
                    overflow: hidden
                    a:nth-of-type(1)
                        // margin-left: 20px
                        display: inline-block
                        padding: 10px 0
                        margin-right: 10px
                        span:nth-of-type(1)
                            width: 19px
                            height: 0
                            padding-top: 22px
                            display: inline-block
                            font-size: 0
                            overflow: hidden
                            background-repeat: no-repeat
                            background-image: url(../../static/image/icon.png)
                            background-size: 100%
                            vertical-align: top
                        span:nth-of-type(2)
                            color: #666666
                            font-weight: 500
                            font-size: 15px
                    a:nth-of-type(2)
                        display: inline-block
                        padding: 10px 0
                        margin-left: 8px
                        span:nth-of-type(1)
                            width: 19px
                            height: 0
                            padding-top: 22px
                            display: inline-block
                            font-size: 0
                            overflow: hidden
                            background-repeat: no-repeat
                            background-image: url(../../static/image/icon.png)
                            background-size: 100%
                            vertical-align: top
                        span:nth-of-type(2)
                            color: #666666
                            font-weight: 500
                            font-size: 15px
                a:nth-of-type(2)
                    display: inline-block
                    margin: 0
                    padding-bottom: 10px
                    span
                        color: #c0afa2
                        font-size: 15px
                        margin-left: 20px

</style>