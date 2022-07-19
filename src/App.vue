<template>
  <div id="app">
    <header-bar/>
    <router-view></router-view>
    <footer-bar/>
  </div>
</template>

<script>
  import HeaderBar from '@/components/header/headerBar'
  import FooterBar from '@/components/footer/footerBar'
  

  export default {
    name: 'app',
    data() {
      return {

      }
    },
    components: {
      HeaderBar,
      FooterBar
    },
    mounted() {
      //获取用户信息展示
      this.$store.dispatch('getUserInfo')
    }
  }
</script>

<style>
  @import "@/assets/css/reset.css";
</style>
