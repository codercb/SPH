<template>
  <div class="outer">
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>
            <p v-if="!userInfo.name">
              <span>请</span>
              <router-link to="/login">登录</router-link>
              <router-link class="register" to="/register">免费注册</router-link>
            </p>
            <p v-else>
              <a>{{userInfo.name}}</a>
              <a class="register" @click="exitLogin">退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <router-link to="/center/myorder">我的订单</router-link>
            <router-link to="/shopcart">我的购物车</router-link>
            <a href="###">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link class="logo" to="/home">
            <img src="~@/assets/img/header/logo.png" alt="">
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
            <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'headerBar',
  data() {
    return {
      keyword: '',
    }
  },
  mounted() {
    //通过全局事件总线清除keyword
    this.$bus.$on('clearKeyword',()=>{
      this.keyword = ''
    })
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    goSearch() {
      //点击搜索按钮之前,如果路径当中有query参数,需要携带给search
      let locations = {
        name: "search",
        params: { keyword: this.keyword || undefined },
      };
      //确定路径当中有query参数
      if (this.$route.query.categoryName) {
        locations.query = this.$route.query;
      }
      this.$router.push(locations);
    },
    //退出登录
    async exitLogin() {
      try {
        await this.$store.dispatch('exitLogin')
        //退出成功回到首页
        this.$router.replace('/home')
      } catch (error) {
        alert(error.message)
      }
      
    }
  },
  
}
</script>

<style scoped>
.outer .header>.top {
  background-color: #eaeaea;
  height: 30px;
  line-height: 30px;
}

.outer .header>.top .container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.outer .header>.top .container .loginList {
  float: left;
}

.outer .header>.top .container .loginList p {
  float: left;
  margin-right: 10px;
}

.outer .header>.top .container .loginList p .register {
  border-left: 1px solid #b3aeae;
  padding: 0 5px;
  margin-left: 5px;
}

.outer .header>.top .container .typeList {
  float: right;
}

.outer .header>.top .container .typeList a {
  padding: 0 10px;
}

.outer .header>.top .container .typeList a+a {
  border-left: 1px solid #b3aeae;
}

.outer .header>.bottom {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.outer .header>.bottom .logoArea {
  float: left;
}

.outer .header>.bottom .logoArea .logo img {
  width: 175px;
  margin: 25px 45px;
}

.outer .header>.bottom .searchArea {
  float: right;
  margin-top: 35px;
}

.outer .header>.bottom .searchArea .searchForm {
  overflow: hidden;
}

.outer .header>.bottom .searchArea .searchForm input {
  box-sizing: border-box;
  width: 490px;
  height: 32px;
  padding: 0px 4px;
  border: 2px solid #ea4a36;
  float: left;
}

.outer .header>.bottom .searchArea .searchForm input:focus {
  outline: none;
}

.outer .header>.bottom .searchArea .searchForm button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  border: none;
  color: #fff;
  float: left;
  cursor: pointer;
}

.outer .header>.bottom .searchArea .searchForm button:focus {
  outline: none;
}
</style>
