<template>
  <div class="outer">
    <div class="paysuccess">

      <div class="success">
        <h3>
          <!-- <img src="~@/assets/img/paySuccess/right.png" width="48" height="48"> -->
          <el-button type="success" icon="el-icon-check" circle></el-button>
          恭喜您，支付成功啦！
        </h3>
        <div class="paydetail">
          <p class="button">
            <a @click="myOrderInfo" class="btn-look">查看订单</a>
            <router-link class="btn-goshop" to="/home">继续购物</router-link>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
 export default {
  name: 'paySuccess',
  //组件内守卫
  beforeRouteEnter(to,from,next) {
    if(from.path == "/pay"){
      next()
    }else{
      next(false)
    }
  },
  data () {
   return {

   }
  },
  methods: {
    myOrderInfo() {
      this.$router.push({name:'center'})
    }
  }
 }
</script>

<style scoped>
.outer .paysuccess {
  margin: 20px auto;
  padding: 25px;
  border: 1px solid #d3d3d3;
  width: 1200px;
  width: 1148px;
}
.outer .paysuccess .success {
  width: 500px;
  margin: 0 auto;
}
.outer .paysuccess .success h3 {
  margin: 20px 0;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
}
.outer .paysuccess .success h3 img {
  max-width: 100%;
  vertical-align: middle;
  border: 0;
  margin-right: 14px;
}
.outer .paysuccess .success .paydetail {
  margin-left: 66px;
  font-size: 15px;
}
.outer .paysuccess .success .paydetail .button {
  margin: 30px 0;
  line-height: 26px;
}
.outer .paysuccess .success .paydetail .button a {
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 2px;
  user-select: none;
  font-size: 18px;
  padding: 4px 20px;
  line-height: 22px;
  text-decoration: none;
}
.outer .paysuccess .success .paydetail .button a.btn-look {
  margin-right: 13px;
  color: #fff;
  background-color: #e1251b;
  border: 1px solid #e1251b;
}
.outer .paysuccess .success .paydetail .button a.btn-goshop {
  color: #666;
  background-color: #eee;
  border: 1px solid #e1e1e1;
}
</style>
