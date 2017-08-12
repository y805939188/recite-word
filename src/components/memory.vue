<template>
  <div class="memory">
    <div class="mer-wrapper">
      <!-- 熟记/已记/未背 和  小图标-->
      <div class="mer-title">
        <span class="recited">
          <span>熟记{{skilled.length}}/</span>
          <span>已背{{forgeted.length+count1.length+count2.length+count3.length+count4.length+count5.length+skilled.length}}\</span>
          <span>未背{{3862-(forgeted.length+count1.length+count2.length+count3.length+count4.length+count5.length+skilled.length)}}</span>
        </span>
         <level :count-num="this.randomWord.count"></level>
      </div>
      <!-- 单词内容  -->
      <div class="word-content">
        <div class="wordWarp">
            <h1>{{this.randomWord.w}}</h1>
            <div class="pronunciation">
              <span></span>
              <span class="phonetic">英 [{{this.randomWord.en}}]</span>
            </div>
            <div class="pronunciation">
              <span></span>
              <span class="phonetic">美 [{{this.randomWord.us}}]</span>
            </div>
        </div>
        <div class="detailed">
          <div class="meaning" v-show="isShow">
            <p v-for="idea in this.randomWord.p" :key="idea.value">
              {{idea.c}}{{idea.p}}
            </p>
          </div>
          <a class="paraphrase" @click="isShowChange" v-show="btnIsShow"></a>
        </div>
        <div class="develop" @click="Dev">
          <i :class="isDevelop" v-show="isShow">{{isDev}}</i>
        </div>
         <div class="hideParaphrase" v-show="isHide">
          <div class="hideWrapper">
            <div class="illustrative" v-show="isShow">
              <h2>例句</h2>
              <div>
                <ul>
                  <li v-for="(sentence,index) in this.randomWord.sen" :key="sentence.value">
                    <p>
                      <span>{{index}}.</span>
                      <span v-html="senSplit[index]"></span>
                    </p>
                    <p>{{sentence.c}}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="synonym">
              <h2>同近义词</h2>
              <div>
                <ul>
                  <li v-for="(homoionym,index) in this.randomWord.syn" :key="homoionym.value">
                    <p>{{homoionym.w}}</p>
                    <p>{{homoionym.bisp}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> 
      </div>
      <!-- 按钮  -->
      <div class="button">
        <div class="developed">
          <div class="btn remember" @click="remeberedBtn">
            <p>记住了</p>
          </div>
          <div class="btn forget" @click="forgetedBtn">
            <p>没记住</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import level from './level'
let random;
let num;
let Num1 = 0;
let Num2 = 0;

var setLocal = {
    save(key,value){
        localStorage.setItem(key, JSON.stringify(value))
    },
    get(key){
        return JSON.parse(localStorage.getItem(key));
    }
}




// import propsync from '../../static/mixin/propsync.js';//引入mixin文件
export default {
  name: 'memory',
//   mixins: [propsync],
  data () {
    return {
      arr: [],
      sen: '',
      isDev: '展开',
      isDevelop: 'isDevelop1',
      isShow: false,
      btnIsShow: true,
      //当前随机单词
      randomWord: {},
      //随机数
      random: random,
      //当前单词数组个数
      nowArrNum: 3825,
      //没记住的
      forgeted: [],
      //熟记的
      skilled: [],
      //count
      count1: [],
      count2: [],
      count3: [],
      count4: [],
      count5: [],

    }
  },

  watch:{
    // 要监听的数据名:function(){
    //     setLocal.save('todos',this.list);
    // }这个是浅监听 只能检测到this的值的改变 不能听到属性下的对象的状态改变

    randomWord:{ //监测它的变化
        handler:function(){
          setLocal.save('randomWord',this.randomWord);
          setLocal.save('nowArrNum',this.nowArrNum);
          setLocal.save('forgeted',this.forgeted);
          setLocal.save('skilled',this.skilled);
          setLocal.save('count1',this.count1);
          setLocal.save('count2',this.count2);
          setLocal.save('count3',this.count3);
          setLocal.save('count4',this.count4);
          setLocal.save('count5',this.count5);
        },
        deep:true,//深监听
    }
  },
  created() {
    this.$emit("update:disappear",false);

      this.random = Math.floor(Math.random() * this.nowArrNum);
      this.$nextTick(() => { // 在这个函数中调用以防内容还未更新完就执行,该函数执行在dom更新完成后,在这儿不知道有用没用,貌似没用
        this.randomWord = this.wordData.data[this.random];
      });
      if(!(window.localStorage.length === 0)) {
        this.randomWord = setLocal.get("randomWord");
        this.nowArrNum = setLocal.get("nowArrNum");
        this.forgeted = setLocal.get("forgeted") || [];
        this.skilled = setLocal.get("skilled") || [];
        this.count1 = setLocal.get("count1") || [];
        this.count2 = setLocal.get("count2") || [];
        this.count3 = setLocal.get("count3") || [];
        this.count4 = setLocal.get("count4") || [];
        this.count5 = setLocal.get("count5") || [];
      }
      console.log(this.randomWord)
  },

  computed: {
    senSplit() {
      let a = this.randomWord.sen.map((value, index, arr) => {
        Num2 = index;
        let reg = new RegExp(this.randomWord.w, 'i', 'g')
        return value.e.replace(reg, '<em>' + this.randomWord.w + '</em>')
        // console.log(value);
      })
      return a
    },
    isHide() {
      if(this.isDev === '收起') {
        return true;
      }
      else {
        return false;
      }
    }
  },
  methods: {
    Dev() {
      if(this.isDev === '展开') {
        this.isDev = '收起';
        this.isDevelop = 'isDevelop2';
      }else{
        this.isDev = '展开';
        this.isDevelop = 'isDevelop1';
      }
    },
    isShowChange() {
      this.isShow = true;
      this.btnIsShow = false;
    },
    remeberedBtn() {
      console.log(this.arr)
      if(this.isDev === '收起') {
        this.Dev();
      }
      this.isShow = false;
      this.btnIsShow = true;
      if(this.randomWord.count === 0) {
        this.randomWord.count = 1;
        this.count1.push(this.forgeted.shift());
      }else if(!this.randomWord.count) { //该单词第一次出现时, 点击记住时该单词的count会变1
        Num1++;
        Vue.set(this.wordData.data[this.random], 'count', 1);
        this.count1.push(this.wordData.data.splice(this.random,1)[0])
        //当前数组数量减一
        this.nowArrNum--;
      }else { //该单词不是第一次出现时
        if(this.randomWord.count === 1) {
          this.randomWord.count++;
          this.count2.push(this.count1.splice(0,1)[0]);
        }else if(this.randomWord.count === 2) {
          this.randomWord.count++;
          this.count3.push(this.count2.splice(0,1)[0]);
        }else if(this.randomWord.count === 3) {
          this.randomWord.count++;
          this.count4.push(this.count3.splice(0,1)[0]);
        }else if(this.randomWord.count === 4) {
          this.randomWord.count++;
          this.count5.push(this.count4.splice(0,1)[0]);
        }else if(this.randomWord.count === 5) {
          this.skilled.push(this.count5.splice(0,1)[0]);
        }
      }
      if(Num1 % 3 === 0 && !(this.forgeted.length === 0)) {
        this.randomWord = this.forgeted[0];
      }else if(Num1 % 7 === 0 && !(this.count1.length === 0)) {
        this.randomWord = this.count1[0];
      }else if(Num1 % 19 === 0 && !(this.count2.length === 0)) {
        this.randomWord = this.count2[0];
      }else if(Num1 % 37 === 0 && !(this.count3.length === 0)) {
        this.randomWord = this.count3[0];
      }else if(Num1 % 53 === 0 && !(this.count4.length === 0)) {
        this.randomWord = this.count4[0];
      }else if(Num1 % 79 === 0 && !(this.count5.length === 0)) {
        this.randomWord = this.count5[0];
      }else {
        //重新随机找个单词
        this.random = Math.floor(Math.random() * this.nowArrNum);
        //重新渲染新的单词
        this.randomWord = this.wordData.data[this.random];
      }      
      console.log(this.randomWord)
    },
    forgetedBtn() {
      if(this.isDev === '收起') {
        this.Dev();
      }
      this.isShow = false;
      this.btnIsShow = true;
      if(this.randomWord.count === 0) {
        this.forgeted.push(this.forgeted.shift());
      }else if(!this.randomWord.count) {
        Num1++;
        Vue.set(this.wordData.data[this.random], 'count', 0);
        this.forgeted.push(this.wordData.data.splice(this.random, 1)[0]);
        this.nowArrNum--;
      }else {
        if(this.randomWord.count === 1) {
          this.randomWord.count--;
          this.forgeted.push(this.count1.shift())
        }else if(this.randomWord.count === 2) {
          this.randomWord.count--;
          this.count1.push(this.count2.shift())
        }else if(this.randomWord.count === 3) {
          this.randomWord.count--;
          this.count2.push(this.count3.shift())
        }else if(this.randomWord.count === 4) {
          this.randomWord.count--;
          this.count3.push(this.count4.shift())
        }else if(this.randomWord.count === 5) {
          this.randomWord.count--;
          this.count4.push(this.count5.shift())
        }
      }
      if(Num1 % 3 === 0 && !(this.forgeted.length === 0) && !(this.forgeted.length === 1)) {
        this.randomWord = this.forgeted[0];
      }else if(Num1 % 7 === 0 && !(this.count1.length === 0)) {
        this.randomWord = this.count1[0];
      }else if(Num1 % 19 === 0 && !(this.count2.length === 0)) {
        this.randomWord = this.count2[0];
      }else if(Num1 % 37 === 0 && !(this.count3.length === 0)) {
        this.randomWord = this.count3[0];
      }else if(Num1 % 53 === 0 && !(this.count4.length === 0)) {
        this.randomWord = this.count4[0];
      }else if(Num1 % 79 === 0 && !(this.count5.length === 0)) {
        this.randomWord = this.count5[0];
      }else {
        this.random = Math.floor(Math.random() * this.nowArrNum);
        this.randomWord = this.wordData.data[this.random];
      }
    }
  },
  props: ["wordData", "disappear"],
  components: {
    level,
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  body
    background-color: #e9e6e2
    .memory
      width: 100%
      background-color: #e9e6e2
      position: absolute
      .mer-wrapper
        margin: 0 20px
        .mer-title
          color: #8e8d89
          height: 20px
          margin: 20px 0px 12px 0px
          font-size: 15px
          font-family: "Roboto black"
          color: #c0afa2
        .word-content
          background-color: #FFF
          box-shadow: 0 2px 6px #BFBDB9
          border-radius: 4px
          .wordWarp
            padding: 20px 20px 10px
            margin: 0
            h1
              font-family: "Roboto Bold","Roboto black"
              font-size: 25px
              color: #4e4c4a;
              height: 29px
            .pronunciation
              display: flex
              span
                align-items: center
                line-height: 24px
                color: #666666
              span:not([class="phonetic"])
                margin-right: 5px
                width: 19px
                height: 0
                padding-top: 22px
                display: inline-block
                font-size: 0;
                overflow: hidden
                background-repeat: no-repeat
                background-image: url(../assets/image/icon.png)
                background-size: 100%
                vertical-align: top
          .detailed
            min-height: 130px
            .paraphrase
              position: relative
              top: 40px
              margin: auto
              background-color: #fff
              background-image: url(../assets/image/dict_show_detail_normal.png)
              background-size: 182px 48px
              width: 182px
              height: 48px
              display: block
              background-repeat: no-repeat
            .meaning
              font-size: 15px
              padding: 0px 10px
              background-color: #fff
              display: block
              p
                color: black
                padding: 5px 10px
          .develop
            background-color: #fff
            border-bottom-left-radius: 4px
            border-bottom-right-radius: 4px
            min-height: 25px
            .isDevelop1
              background: url(../assets/image/dict_result_fold_icon_normal.png) -5px -3px no-repeat
              background-size: 24px 24px
              padding-left: 18px
              padding-top: 0px
              line-height: 20px
              padding-bottom: 0px
              margin-left: 21px
              color: #666666
              font-family: Arial
            .isDevelop2
              background: url(../assets/image/dict_result_less_icon_normal.png) -5px -3px no-repeat
              background-size: 24px 24px
              padding-left: 18px
              padding-top: 0px
              line-height: 20px
              padding-bottom: 0px
              margin-left: 21px
              color: #666666
              font-family: Arial
          .hideParaphrase
            border: 1px solid #fff
            box-shadow: 0 0 5px grey
            border-radius: 5px
            width: 97%
            position: relative
            margin: 0 auto
            .hideWrapper
              padding: 2px 1px
              .illustrative
                margin: 16px 0px
                background: #fff
                border: 1px solid #fff
                h2
                  color: #B6AFA2
                  padding: .6em 1em
                  font-size: 100%
                  font-weight: normal
                  margin: 0
                  border-bottom: 1px solid #DAD5CB
                div
                  ul
                    list-style: none
                    margin: 0
                    padding: 0
                    color: #B6AFA2
                    li
                      padding: .6em 0
                      padding-left: 20px
                      padding-right: 20px
                      p
                        margin-bottom: 5px
                        span:nth-of-type(1)
                          margin-right: 6px
                        span:nth-of-type(2)
                          color: #4E4C4A
                          line-height: 20px
                          em
                            color: #9C6;
                            font-family: "Roboto"
                            margin-right: .2em
              .synonym
                h2
                  color: #B6AFA2
                  padding: .6em 1em
                  font-size: 100%
                  font-weight: normal
                  margin: 0
                  border-bottom: 1px solid #DAD5CB
                div
                  ul
                    margin: 0.5em 1em
                    li
                      list-style: none
                      line-height: 30px
                      p
                        font-family: "Roboto"
                        font-style: normal
                        word-wrap: break-word
                        word-break: break-all
                        color: black
        .button
          .developed
            border-radius: 4px
            margin: 15px 0
            background-color: #fff
            line-height: 66px
            height: 66px
            padding: 2px 1px
            .remember
              float: right
              height: 66px
              padding-top: 0px
              position: relative
              display: block
              width: 50%
              p
                color: #4e4c4a
                background: url(../assets/image/dict_school_emember_icon_normal.png) 10px 19px no-repeat
                background-size: 24px 24px
                line-height: 64px
                width: 50px
                height: 64px
                padding-left: 48px
                margin: auto
            .forget
              height: 66px
              padding-top: 0px
              position: relative
              display: block
              width: 49%
              border-right: 1px solid #ccc
              p
                color: #4e4c4a
                background: url(../assets/image/dict_school_forget_icon_normal.png) 10px 19px no-repeat
                background-size: 24px 24px
                line-height: 64px
                width: 50px
                height: 64px
                padding-left: 48px
                margin: auto



                    
</style>
