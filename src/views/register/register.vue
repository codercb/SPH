<template>
  <div class="outer">
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone">
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code">
        <button class="get_code" @click="getCode(phone)">获取验证码</button>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password">
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="password1">
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" :checked="argee">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click="registerSuccess">完成注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'register',
  data() {
    return {
      //手机号
      phone:'',
      //验证码
      code:'',
      //登录密码
      password:'',
      //确认密码
      password1:'',
      //同意协议
      argee: true
    }
  },
  computed: {
    // ...mapState({
    //   code: state => state.user.code
    // })
  },
  methods: {
    //获取验证码
    async getCode(phone) {
      try {
        if(phone) await this.$store.dispatch('getCode',phone)
        this.code = this.$store.state.user.code
      } catch (error) {
        alert(error.message)
      }
       
    },
    //完成注册
    async registerSuccess() {
      let data = {
        phone: this.phone,
        code: this.code,
        password: this.password
      }
      try {
        if(this.phone && this.code && this.password == this.password1) await this.$store.dispatch('registerSuccess',data)
        this.$router.replace('/login')
      } catch (error) {
        alert(error.message)
      }
      
    }
  }
}
</script>

<style scoped>
.register {
  width: 1200px;
  height: 445px;
  border: 1px solid #dfdfdf;
  margin: 0 auto;
}
.register h3 {
  background: #ececec;
  margin: 0;
  padding: 6px 15px;
  color: #333;
  border-bottom: 1px solid #dfdfdf;
  font-size: 20.04px;
  line-height: 30.06px;
}
.register h3 span {
  font-size: 14px;
  float: right;
}
.register h3 span a {
  color: #e1251b;
}
.register div:nth-of-type(1) {
  margin-top: 40px;
}
.register .content {
  padding-left: 390px;
  margin-bottom: 18px;
  position: relative;
}
.register .content label {
  font-size: 14px;
  width: 96px;
  text-align: right;
  display: inline-block;
}
.register .content input {
  width: 270px;
  height: 38px;
  padding-left: 8px;
  box-sizing: border-box;
  margin-left: 5px;
  outline: none;
  border: 1px solid #999;
}
.register .content img {
  vertical-align: sub;
}

.register .content .get_code{
  width:100px;
  height:38px;
  margin-left:5px;
}
.register .content .error-msg {
  position: absolute;
  top: 100%;
  left: 495px;
  color: red;
}
.register .controls {
  text-align: center;
  position: relative;
}
.register .controls input {
  vertical-align: middle;
}
.register .controls .error-msg {
  position: absolute;
  top: 100%;
  left: 495px;
  color: red;
}
.register .btn {
  text-align: center;
  line-height: 36px;
  margin: 17px 0 0 55px;
}
.register .btn button {
  outline: none;
  width: 270px;
  height: 36px;
  background: #e1251b;
  color: #fff !important;
  display: inline-block;
  font-size: 16px;
}
</style>
