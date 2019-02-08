<template>
  <div id="register-wrapper">

    <form :class="clsName" class="regiseter-content" ref="register-content" @submit.prevent="handleSubmit">
      <div class="animated fadeInDown register-msg" v-show="isShowMsg" :style="{'background-color': msgBackgroundColor}">
        {{regiseter_msg}}
      </div>
      <input type="text" class="register-nick" placeholder="昵称..." name="nick" v-show="isRegisteing">
      <input type="text" class="register-email" placeholder="邮箱..." name="email" v-show="isRegisteing">
      <input type="text" class="register-user" placeholder="用户名..." name="user">
      <input type="text" class="register-pwd" placeholder="密码..." name="pwd">
      <input type="text" class="register-repwd" placeholder="确认密码..." name="repwd" v-show="isRegisteing">
      <div class="register-click" @click="handleRegisterClick">{{isRegisteing ? '返回登录' : '注册'}}</div>
      <button class="register-logoin" @click="handleClick">{{!isRegisteing ? '登录' : '注册'}}</button>
    </form>
  </div>
</template>

<script>

import { LOGIN, REGISTER } from '../url/index.js'
export default {
  name: 'app',

  data() {
    return {
      isRegisteing: false,
      regiseter_msg: '登陆成功, 正在跳转...',
      msgBackgroundColor: '#3fc73f',
      isShowMsg: false
    }
  },
  props: {
    clsName: {
      default: ''
    }
  },
  created() {

  },
  mounted() {

  },
  computed: {

  },
  methods: {
      handleClick() {
        let form = this.$refs["register-content"]
        let formData = new FormData(form);
        let user = formData.get("user")
        let pwd = formData.get("pwd")
        let repwd, email, nick
        if (this.isRegisteing) {
          repwd = formData.get('repwd')
          email = formData.get('email')
          nick = formData.get('nick')
        }

        let err = false
        if (!(user.trim() && pwd.trim())) {
          err = true
          this.regiseter_msg = '请填写用户名和密码'
        }
        if (this.isRegisteing) {
          if (!nick.trim() && nick.trim().length <= 8) {
            err = true
            this.regiseter_msg = '请输入长度小于8位的昵称'
          }
          if (!repwd.trim()) {
            err = true
            this.regiseter_msg = '请确认密码'
          }
          if (!email.trim()) {
            err = true
            this.regiseter_msg = '请填写邮箱'
          }
          if (repwd !== pwd) {
            err = true
            this.regiseter_msg = '两次输入的密码有误'
          }
        }
        if (err) {
          this.isShowMsg = true
          this.msgBackgroundColor = '#fb2727'
          return
        }

        if (!this.isRegisteing) {
          let _formData = new FormData()
          _formData.append('user', user)
          _formData.append('pwd', pwd)
          this.axios.post(LOGIN, _formData).then((res) => {
            if (Number(res.data.code) === 4) {
              localStorage.setItem('authorization', res.data.data.token)
              localStorage.setItem('auth_nick', res.data.data.nick)
              this.axios.defaults.headers.common['Authorization'] = res.data.data.token
              this.regiseter_msg = res.data.msg
              this.isShowMsg = true
              this.msgBackgroundColor = '#3fc73f'
              this.$emit('handleClickBtnAfter')
            } else if (Number(res.data.code) === 3) {
              let msg =  res.data.msg
              this.regiseter_msg = msg
              this.isShowMsg = true
              this.msgBackgroundColor = '#fb2727'
            }
          })
        } else {
          let _formData = new FormData()
          _formData.append('user', user)
          _formData.append('pwd', pwd)
          _formData.append('re_pwd', repwd)
          _formData.append('email', email)
          _formData.append('nick', nick)
          this.axios.post(REGISTER, _formData).then((res) => {
            if (Number(res.data.code) === 2) {
              localStorage.setItem('authorization', res.data.data.token)
              localStorage.setItem('auth_nick', res.data.data.nick)
              this.regiseter_msg = res.data.msg
              this.isShowMsg = true
              this.msgBackgroundColor = '#3fc73f'
              this.$emit('handleClickBtnAfter')
            } else if (Number(res.data.code) === 21) {
              let msg =  res.data.msg
              this.regiseter_msg = Object.values(msg)[0][0]
              this.isShowMsg = true
              this.msgBackgroundColor = '#fb2727'
            }
          })
        }
      },
      handleSubmit() {
        return false
      },
      handleRegisterClick() {
        this.isShowMsg = false
        this.isRegisteing = !this.isRegisteing
      }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #register-wrapper
    position: relative
    width: 80%
    box-shadow: 0px 0px 26px #888888
    border-radius: 5px
    margin: 0 auto
    top: 150px
    display: flex;
    align-content: center;
    justify-content: center;
    background-color: #fff;
    .regiseter-content
      width: 80%
      display: block
      .register-msg
        position: relative
        top: -30%
        width: 100%;
        border-radius: 5px;
        text-align: center;
        padding: 14px 0;
        color: #fff;
      input
        padding-left: 10px
        border-radius: 10px
        height: 30px
        width: 100%
        margin: 10% 0
        box-sizing: border-box;
      button
        display: block;
        margin: 0 auto;
        border-radius: 10px;
        border: 0px;
        width: 30%;
        height: 30px;
        margin-top: 10px;
        margin-bottom: 40px;
      .register-click
        color: #408bdc
        font-size: 14px
        position: absolute
        right: 5%
        margin-top: 10px
</style>