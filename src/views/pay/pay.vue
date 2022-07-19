<template>
  <div class="outer">
    <div class="pay-main">
      <div class="pay-container">
        <div class="checkout-tit">
          <h4 class="tit-txt">
            <span class="success-icon"></span>
            <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
          </h4>
          <div class="paymark">
            <span class="fl">请您在提交订单<em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>{{orderId}}</em></span>
            <span class="fr"><em class="lead">应付金额：</em><em class="orange money">￥{{payInfo.totalFee}}.00</em></span>
          </div>
        </div>
        <div class="checkout-info">
          <h4>重要说明：</h4>
          <ol>
            <li>尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。</li>
            <li>其它支付渠道正在调试中，敬请期待。</li>
            <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
          </ol>
          <h4>支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）</h4>
          <ul>
            <li>支付帐号：11111111</li>
            <li>密码：111111</li>
            <li>支付密码：111111</li>
          </ul>
        </div>
        <div class="checkout-steps">
          <div class="step-tit">
            <h5>支付平台</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="~@/assets/img/pay/pay2.jpg"></li>
              <li><img src="~@/assets/img/pay/pay3.jpg"></li>
            </ul>

          </div>
          <div class="hr"></div>

          <div class="payshipInfo">
            <div class="step-tit">
              <h5>支付网银</h5>
            </div>
            <div class="step-cont">
              <ul class="payType">
                <li><img src="~@/assets/img/pay/pay10.jpg"></li>
                <li><img src="~@/assets/img/pay/pay11.jpg"></li>
                <li><img src="~@/assets/img/pay/pay12.jpg"></li>
                <li><img src="~@/assets/img/pay/pay13.jpg"></li>
                <li><img src="~@/assets/img/pay/pay14.jpg"></li>
                <li><img src="~@/assets/img/pay/pay15.jpg"></li>
                <li><img src="~@/assets/img/pay/pay16.jpg"></li>
                <li><img src="~@/assets/img/pay/pay17.jpg"></li>
                <li><img src="~@/assets/img/pay/pay18.jpg"></li>
                <li><img src="~@/assets/img/pay/pay19.jpg"></li>
                <li><img src="~@/assets/img/pay/pay20.jpg"></li>
                <li><img src="~@/assets/img/pay/pay21.jpg"></li>
                <li><img src="~@/assets/img/pay/pay22.jpg"></li>

              </ul>
            </div>

          </div>
          <div class="hr"></div>

          <div class="submit">
            <a class="btn" @click="open">立即支付</a>
          </div>
          <div class="otherpay">
            <div class="step-tit">
              <h5>其他支付方式</h5>
            </div>
            <div class="step-cont">
              <span><a href="###">微信支付</a></span>
              <span>中国银联</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
 export default {
  name: 'pay',
  data () {
   return {
    //存储支付信息
    payInfo: {},
    //定时器
    timer: null,
    //订单支付状态码
    code: ''
   }
  },
  computed: {
    orderId() {
      return this.$route.query.orderId
    }
  },
  mounted() {
    this.getPayInfo()
  },
  methods: {
    //获取支付信息
    async getPayInfo() {
      let result = await this.$API.reqPayInfo(this.orderId)
      console.log(result)
      if(result.code == 200){
        this.payInfo = result.data
      }else{
        alert(result.data)
      }
    },
    //弹出框
    async open() {
      //生成二维码
      let codeUrl = await QRCode.toDataURL(this.payInfo.codeUrl)
      this.$alert(`<img src=${codeUrl} />`, '请使用微信支付', {
        dangerouslyUseHTMLString: true,
        center:true,
        //roundButton:true,
        showClose:false,
        showCancelButton:true,
        showConfirmButton:true,
        cancelButtonText:'支付遇见问题',
        confirmButtonText:'在线支付成功',
        //关闭弹出框的配置项
        beforeClose:(type,instance,done) => {
          if(type == 'cancel'){
            alert('请联系管理员')
            //清除定时器
            clearInterval(this.timer)
            this.timer = null
            //关闭弹出框
            done()
          }else{
            //判断是否支付
            //if(this.code == 200){
              //清除定时器
              clearInterval(this.timer)
              this.timer = null
              //关闭弹出框
              done()
              //跳转到下一个路由
              this.$router.push('/paysuccess')
            //}
          }
        }
      })
      //创建一个计时器
      if(!this.timer){
        this.timer = setInterval(async () => {
          //发请求获取用户支付状态
          let result = await this.$API.reqPayStatus(this.orderId)
          if(result.code == 200){
            //第一步：清除定时器
            clearInterval(this.timer)
            this.timer = null
            //第二步：保存支付成功的状态码
            this.code = result.code
            //第三步：关闭弹出框
            this.$msgbox.close()
            //第四步：跳转到下一路由 （支付成功页面）
            this.$router.push('/paysuccess')
          }
        },1000)
      }
    }
  }
 }
</script>

<style scoped>
.outer .pay-main {
  margin-bottom: 20px;
}
.outer .pay-main .pay-container {
  margin: 0 auto;
  width: 1200px;
}
.outer .pay-main .pay-container a:hover {
  color: #4cb9fc;
}
.outer .pay-main .pay-container .orange {
  color: #e1251b;
}
.outer .pay-main .pay-container .money {
  font-size: 18px;
}
.outer .pay-main .pay-container .zfb {
  color: #e1251b;
  font-weight: 700;
}
.outer .pay-main .pay-container .checkout-tit {
  padding: 10px;
}
.outer .pay-main .pay-container .checkout-tit .tit-txt {
  font-size: 14px;
  line-height: 21px;
}
.outer .pay-main .pay-container .checkout-tit .tit-txt .success-icon {
  width: 30px;
  height: 30px;
  display: inline-block;
  background: url(~@/assets/img/pay/icon.png) no-repeat 0 0;
}
.outer .pay-main .pay-container .checkout-tit .tit-txt .success-info {
  padding: 0 8px;
  line-height: 30px;
  vertical-align: top;
}
.outer .pay-main .pay-container .checkout-tit .paymark {
  overflow: hidden;
  line-height: 26px;
  text-indent: 38px;
}
.outer .pay-main .pay-container .checkout-tit .paymark .fl {
  float: left;
}
.outer .pay-main .pay-container .checkout-tit .paymark .fr {
  float: right;
}
.outer .pay-main .pay-container .checkout-tit .paymark .fr .lead {
  margin-bottom: 18px;
  font-size: 15px;
  font-weight: 400;
  line-height: 22.5px;
}
.outer .pay-main .pay-container .checkout-info {
  padding-left: 25px;
  padding-bottom: 15px;
  margin-bottom: 10px;
  border: 2px solid #e1251b;
}
.outer .pay-main .pay-container .checkout-info h4 {
  margin: 9px 0;
  font-size: 14px;
  line-height: 21px;
  color: #e1251b;
}
.outer .pay-main .pay-container .checkout-info ol {
  padding-left: 25px;
  list-style-type: decimal;
  line-height: 24px;
  font-size: 14px;
}
.outer .pay-main .pay-container .checkout-info ul {
  padding-left: 25px;
  list-style-type: disc;
  line-height: 24px;
  font-size: 14px;
}
.outer .pay-main .pay-container .checkout-steps {
  border: 1px solid #ddd;
  padding: 25px;
}
.outer .pay-main .pay-container .checkout-steps .hr {
  height: 1px;
  background-color: #ddd;
}
.outer .pay-main .pay-container .checkout-steps .step-tit {
  line-height: 36px;
  margin: 15px 0;
}
.outer .pay-main .pay-container .checkout-steps .step-cont {
  margin: 0 10px 12px 20px;
}
.outer .pay-main .pay-container .checkout-steps .step-cont ul {
  font-size: 0;
}
.outer .pay-main .pay-container .checkout-steps .step-cont ul li {
  margin: 2px;
  display: inline-block;
  padding: 5px 20px;
  border: 1px solid #ddd;
  cursor: pointer;
  line-height: 18px;
}
.outer .pay-main .pay-container .submit {
  text-align: center;
}
.outer .pay-main .pay-container .submit .btn {
  display: inline-block;
  padding: 15px 45px;
  margin: 15px 0 10px;
  font: 18px "微软雅黑";
  font-weight: 700;
  border-radius: 0;
  background-color: #e1251b;
  border: 1px solid #e1251b;
  color: #fff;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
}
</style>
