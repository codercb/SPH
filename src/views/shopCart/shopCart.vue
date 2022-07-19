<template>
  <div>
    <!-- 全部商品分类 -->
    <type-nav />
    <!-- 购物车列表 -->
    <div class="cart">
      <h4>全部商品</h4>
      <div class="cart-main">
        <div class="cart-th">
          <div class="cart-th1">全部</div>
          <div class="cart-th2">商品</div>
          <div class="cart-th3">单价（元）</div>
          <div class="cart-th4">数量</div>
          <div class="cart-th5">小计（元）</div>
          <div class="cart-th6">操作</div>
        </div>
        <div class="cart-body">


          <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
            <li class="cart-list-con1">
              <input type="checkbox" name="chk_list" 
              :checked="cart.isChecked==1" 
              @change="updateChecked(cart,$event)">
            </li>
            <li class="cart-list-con2">
              <img :src="cart.imgUrl">
              <div class="item-msg">{{cart.skuName}}</div>
            </li>
            <li class="cart-list-con3">
              <div class="item-txt">语音升级款</div>
            </li>
            <li class="cart-list-con4">
              <span class="price">{{cart.skuPrice}}.00</span>
            </li>
            <li class="cart-list-con5">
              <a href="javascript:void(0)" class="mins" @click="handler('decrement',-1,cart)">-</a>
              <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value,cart)">
              <a href="javascript:void(0)" class="plus" @click="handler('increment',1,cart)">+</a>
            </li>
            <li class="cart-list-con6">
              <span class="sum">{{cart.skuNum * cart.skuPrice}}</span>
            </li>
            <li class="cart-list-con7">
              <a href="javascript:void(0)" class="sindelet" @click="deleteCartListItem(cart.skuId)">删除</a>
              <br>
              <a href="javascript:void(0)">移到收藏</a>
            </li>
          </ul>

        </div>
      </div>
      <div class="cart-tool">
        <div class="select-all">
          <input class="chooseAll" type="checkbox" :checked="isCheckedAll&&cartInfoList.length > 0" @change="updateCheckedAll">
          <span>全选</span>
        </div>
        <div class="option">
          <a @click="deleteCheckedCart">删除选中的商品</a>
          <a href="#none">移到我的关注</a>
          <a href="#none">清除下柜商品</a>
        </div>
        <div class="money-box">
          <div class="chosed">已选择
            <span>{{getCartListLength}}</span>件商品
          </div>
          <div class="sumprice">
            <em>总价（不含运费） ：</em>
            <i class="summoney">{{totalPric}}</i>
          </div>
          <div class="sumbtn">
            <router-link class="sum-btn" to="/trade">结算</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import TypeNav from '@/components/typeNav/TypeNav'
import { mapGetters } from 'vuex'
//引入lodash中的节流方法
import throttle from 'lodash/throttle'
 export default {
  name: 'shopCart',
  data () {
   return {
    
   }
  },
  components: {
    TypeNav
  },
  computed: {
    ...mapGetters(['cartList']),
    //购物车列表数据
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    //购物车商品总价
    totalPric() {
      let sum = 0
      // this.cartInfoList.forEach(item => {
      //   sum += item.skuNum * item.skuPrice
      // })
      // for (let item of this.cartInfoList){
      //   sum += item.skuNum * item.skuPrice
      // }
      this.cartInfoList.filter(item => item.isChecked == 1).forEach(item => {
        sum += item.skuNum * item.skuPrice
      })
      return sum
    },
    //判断全选状态
    isCheckedAll() {
      return this.cartInfoList.every(item => item.isChecked == 1)
    },
    //获取购物车列表数量
    getCartListLength() {
      return this.cartInfoList.filter(item => item.isChecked == 1).length
    }
  },
  mounted() {
    //console.log(this.cartInfoList)
    this.getData()
  },
  methods:{
    getData() {
      this.$store.dispatch('getCartList')
    },
    //处理商品复选框操作
    async updateChecked(cart,event) {
      try {
        let skuId = cart.skuId
        let isChecked = event.target.checked ? "1" : "0"
        await this.$store.dispatch('updateCartChecked',{skuId,isChecked})
        this.getData()
      } catch (error) {
        alert(error.message)
      }
      
    },
    //处理购物车数量 使用throttle节流防止用户快速点击
    handler:throttle(async function(type,disNum,cart) {
      switch(type){
        case 'increment':
          disNum = 1
        break;
        case 'decrement':
          //cart.skuNum > 1 ? disNum =  -1 : disNum = 0
          disNum = cart.skuNum > 1 ?  -1 : 0
        break;
        case 'change':
          disNum = disNum * 1
          if(isNaN(disNum) || disNum < 1){
            disNum = 0
          }else{
            disNum = parseInt(disNum) - cart.skuNum
          }
        break;

      }
      //console.log('参数skuNum',disNum)
      try {
        //成功
        await this.$store.dispatch('addToCart',{skuId:cart.skuId,skuNum:disNum})
        this.getData()
      } catch (error) {
        //失败
        alert(error.message)
      }
    },500),
    // async handler(type,disNum,cart){
    //   switch(type){
    //     case 'increment':
    //       disNum = 1
    //     break;
    //     case 'decrement':
    //       //cart.skuNum > 1 ? disNum =  -1 : disNum = 0
    //       disNum = cart.skuNum > 1 ?  -1 : 0
    //     break;
    //     case 'change':
    //       disNum = disNum * 1
    //       if(isNaN(disNum) || disNum < 1){
    //         disNum = 0
    //       }else{
    //         disNum = parseInt(disNum) - cart.skuNum
    //       }
    //     break;

    //   }
    //   //console.log('参数skuNum',disNum)
    //   try {
    //     //成功
    //     await this.$store.dispatch('addToCart',{skuId:cart.skuId,skuNum:disNum})
    //     this.getData()
    //   } catch (error) {
    //     //失败
    //     alert(error.message)
    //   }
    // },

    //删除购物车某一项
    async deleteCartListItem(skuId) {
      try {
        await this.$store.dispatch('deleteCartItem',skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    //全选操作
    async updateCheckedAll(event) {
      try {
        let isChecked = event.target.checked ? "1" : "0"
        await this.$store.dispatch('updateCheckedAll',isChecked)
        //再次发送请求
        this.getData()
      } catch (error) {
        alert(error.message)
      }
      
    },
    //删除选中商品操作
    async deleteCheckedCart() {
      try {
        await this.$store.dispatch('deleteCheckedCart')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
      
    },
    
  }
 }
</script>

<style scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
}
.cart h4 {
  margin: 9px 0;
  font-size: 14px;
  line-height: 21px;
}
.cart .cart-main .cart-th {
  background: #f5f5f5;
  border: 1px solid #ddd;
  padding: 10px;
  overflow: hidden;
}
.cart .cart-main .cart-th > div {
  float: left;
}
.cart .cart-main .cart-th .cart-th1 {
  width: 25%;
}
.cart .cart-main .cart-th .cart-th1 input {
  vertical-align: middle;
}
.cart .cart-main .cart-th .cart-th1 span {
  vertical-align: middle;
}
.cart .cart-main .cart-th .cart-th2 {
  width: 25%;
}
.cart .cart-main .cart-th .cart-th3,
.cart .cart-main .cart-th .cart-th4,
.cart .cart-main .cart-th .cart-th5,
.cart .cart-main .cart-th .cart-th6 {
  width: 12.5%;
}
.cart .cart-main .cart-body {
  margin: 15px 0;
  border: 1px solid #ddd;
}
.cart .cart-main .cart-body .cart-list {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
}
.cart .cart-main .cart-body .cart-list > li {
  float: left;
}
.cart .cart-main .cart-body .cart-list .cart-list-con1 {
  width: 4.1667%;
}
.cart .cart-main .cart-body .cart-list .cart-list-con2 {
  width: 25%;
}
.cart .cart-main .cart-body .cart-list .cart-list-con2 img {
  width: 82px;
  height: 82px;
  float: left;
}
.cart .cart-main .cart-body .cart-list .cart-list-con2 .item-msg {
  float: left;
  width: 150px;
  margin: 0 10px;
  line-height: 18px;
}
.cart .cart-main .cart-body .cart-list .cart-list-con3 {
  width: 20.8333%;
}
.cart .cart-main .cart-body .cart-list .cart-list-con3 .item-txt {
  text-align: center;
}
.cart .cart-main .cart-body .cart-list .cart-list-con4 {
  width: 12.5%;
}
.cart .cart-main .cart-body .cart-list .cart-list-con5 {
  width: 12.5%;
}
.cart .cart-main .cart-body .cart-list .cart-list-con5 .mins {
  border: 1px solid #ddd;
  border-right: 0;
  float: left;
  color: #666;
  width: 6px;
  text-align: center;
  padding: 8px;
}
.cart .cart-main .cart-body .cart-list .cart-list-con5 input {
  border: 1px solid #ddd;
  width: 40px;
  height: 32px;
  float: left;
  text-align: center;
  font-size: 14px;
}
.cart .cart-main .cart-body .cart-list .cart-list-con5 .plus {
  border: 1px solid #ddd;
  border-left: 0;
  float: left;
  color: #666;
  width: 6px;
  text-align: center;
  padding: 8px;
}
.cart .cart-main .cart-body .cart-list .cart-list-con6 {
  width: 12.5%;
}
.cart .cart-main .cart-body .cart-list .cart-list-con6 .sum {
  font-size: 16px;
}
.cart .cart-main .cart-body .cart-list .cart-list-con7 {
  width: 12.5%;
}
.cart .cart-main .cart-body .cart-list .cart-list-con7 a {
  color: #666;
}
.cart .cart-tool {
  overflow: hidden;
  border: 1px solid #ddd;
}
.cart .cart-tool .select-all {
  padding: 10px;
  overflow: hidden;
  float: left;
}
.cart .cart-tool .select-all span {
  vertical-align: middle;
  margin-left:3px;
}
.cart .cart-tool .select-all input {
  vertical-align: middle;
}
.cart .cart-tool .option {
  padding: 10px;
  overflow: hidden;
  float: left;
}
.cart .cart-tool .option a {
  float: left;
  padding: 0 10px;
  color: #666;
}
.cart .cart-tool .money-box {
  float: right;
}
.cart .cart-tool .money-box .chosed {
  line-height: 26px;
  float: left;
  padding: 0 10px;
}
.cart .cart-tool .money-box .sumprice {
  width: 200px;
  line-height: 22px;
  float: left;
  padding: 0 10px;
}
.cart .cart-tool .money-box .sumprice .summoney {
  color: #c81623;
  font-size: 16px;
}
.cart .cart-tool .money-box .sumbtn {
  float: right;
}
.cart .cart-tool .money-box .sumbtn a {
  display: block;
  position: relative;
  width: 96px;
  height: 52px;
  line-height: 52px;
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  background: #e1251b;
  overflow: hidden;
}

</style>
