<template>
  <div class="outer">
    <!-- 买卖 -->
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div class="address clearFix" v-for="address in addressInfo" :key="address.id" @click="chooseAddress(address,addressInfo)">
        <span class="username" :class="{selected:address.isDefault == 1}">{{address.consignee}}</span>
        <p>
          <span class="s1">{{address.userAddress}}</span>
          <span class="s2">{{address.phoneNum}}</span>
          <span class="s3" v-if="address.isDefault == 1">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left:5px;">货到付款</span>

      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul class="list clearFix" v-for="shop in shopInfo.detailArrayList" :key="shop.skuId">
          <li>
            <img :src="shop.imgUrl" alt="" style="width:100px;">
          </li>
          <li>
            <p>{{shop.skuName}}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>¥{{shop.orderPrice}}.00</h3>
          </li>
          <li>X{{shop.skuNum}}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont" v-model="msg"></textarea>

      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b><i>{{shopInfo.totalNum}}</i>件商品，总商品金额</b>
          <span>¥{{shopInfo.totalAmount}}.00</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">应付金额:　<span>¥{{shopInfo.totalAmount}}.00</span></div>
      <div class="receiveInfo">
        寄送至:
        <span>{{userDefaultAddress.fullAddress}}</span>
        收货人：<span>{{userDefaultAddress.consignee}}</span>
        <span>{{userDefaultAddress.phoneNum}}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="orderSubmit">提交订单</a>

    </div>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
 export default {
  name: 'trade',
  data () {
   return {
    msg: ''
   }
  },
  computed: {
    ...mapState({
      addressInfo: state => state.trade.addressInfo,
      shopInfo: state => state.trade.shopInfo
    }),
    //...mapGetters(['shopList']),
    userDefaultAddress() {
      return this.addressInfo.find(item => item.isDefault == 1) || {}
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    //获取数据
    getData() {
      this.$store.dispatch('getAddressInfo')
      this.$store.dispatch('getShopInfo')
    },
    //选中默认地址
    chooseAddress(address,addressInfo) {
      addressInfo.forEach(item => item.isDefault = 0);
      address.isDefault = 1
    },
    //提交订单
    async orderSubmit() {
      //console.log(this.$API)
      let tradeNo = this.shopInfo.tradeNo
      let data = {
        "consignee": this.userDefaultAddress.consignee,
        "consigneeTel": this.userDefaultAddress.phoneNum,
        "deliveryAddress": this.userDefaultAddress.fullAddress,
        "paymentWay": "ONLINE",
        "orderComment": this.msg,
        "orderDetailList": this.shopInfo.detailArrayList
      }

      let result = await this.$API.reqSubmitOrder(tradeNo,data)
      console.log(result)
      if(result.code == 200){
        this.$router.push({name:'pay',query:{orderId:result.data}})
      }else{
        alert(result.data)
      }
    }
  },
 }
</script>

<style scoped>
.title {
  width: 1200px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 21px;
}
.content {
  width: 1200px;
  margin: 10px auto 0;
  border: 1px solid #dddddd;
  padding: 25px;
  box-sizing: border-box;
}
.content .receive,
.content .pay {
  line-height: 36px;
  margin: 18px 0;
}
.content .address {
  padding-left: 20px;
  margin-bottom: 15px;
}
.content .address .username {
  float: left;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #ddd;
  position: relative;
}
.content .address .username::after {
  content: "";
  display: none;
  width: 13px;
  height: 13px;
  position: absolute;
  right: 0;
  bottom: 0;
  background: url(~@/assets/img/trade/choosed.png) no-repeat;
}
.content .address .username.selected {
  border-color: #e1251b;
}
.content .address .username.selected::after {
  display: block;
}
.content .address p {
  width: 610px;
  float: left;
  line-height: 30px;
  margin-left: 10px;
  padding-left: 5px;
  cursor: pointer;
}
.content .address p .s1 {
  float: left;
}
.content .address p .s2 {
  float: left;
  margin: 0 5px;
}
.content .address p .s3 {
  float: left;
  width: 56px;
  height: 24px;
  line-height: 24px;
  margin-left: 10px;
  background-color: #878787;
  color: #fff;
  margin-top: 3px;
  text-align: center;
}
.content .address p:hover {
  background-color: #ddd;
}
.content .line {
  height: 1px;
  background-color: #ddd;
}
.content .way {
  width: 1080px;
  height: 110px;
  background: #f4f4f4;
  padding: 15px;
  margin: 0 auto;
}
.content .way h5 {
  line-height: 50px;
}
.content .way .info {
  margin-top: 20px;
}
.content .way .info .s1 {
  float: left;
  border: 1px solid #ddd;
  width: 120px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-right: 10px;
}
.content .way .info p {
  line-height: 30px;
}
.content .detail {
  width: 1080px;
  background: #feedef;
  padding: 15px;
  margin: 2px auto 0;
}
.content .detail h5 {
  line-height: 50px;
}
.content .detail .list {
  display: flex;
  justify-content: space-between;
}
.content .detail .list li {
  line-height: 30px;
}
.content .detail .list li:nth-child(2){
  width:40%;
}

.content .detail .list li p {
  margin-bottom: 10px;
}
.content .detail .list li h4 {
  color: #c81623;
  font-weight: 400;
}
.content .detail .list li h3 {
  color: #e12228;
}
.content .bbs {
  margin-bottom: 15px;
}
.content .bbs h5 {
  line-height: 50px;
}
.content .bbs textarea {
  width: 100%;
  border-color: #e4e2e2;
  line-height: 1.8;
  outline: none;
  resize: none;
}
.content .bill h5 {
  line-height: 50px;
}
.content .bill div {
  padding-left: 15px;
}
.money {
  width: 1200px;
  margin: 20px auto;
}
.money ul {
  width: 220px;
  float: right;
}
.money ul li {
  line-height: 30px;
  display: flex;
  justify-content: space-between;
}
.money ul li i {
  color: red;
}
.trade {
  box-sizing: border-box;
  width: 1200px;
  padding: 10px;
  margin: 10px auto;
  text-align: right;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
}
.trade div {
  line-height: 30px;
}
.trade .price span {
  color: #e12228;
  font-weight: 700;
  font-size: 14px;
}
.trade .receiveInfo {
  color: #999;
}
.sub {
  width: 1200px;
  margin: 0 auto 10px;
}
.sub .subBtn {
  float: right;
  width: 164px;
  height: 56px;
  font: 700 18px "微软雅黑";
  line-height: 56px;
  text-align: center;
  color: #fff;
  background-color: #e1251b;
}

</style>
