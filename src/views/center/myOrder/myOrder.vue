<template>
  <div class="order-right">
    <!--订单内容-->
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">

        <table class="order-item" v-for="order in myOrder.records" :key="order.id">
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle">{{order.createTime}}　订单编号：{{order.outTradeNo}} <span
                    class="pull-right delete"><img src="~@/assets/img/myOrder/delete.png"></span></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(sku,index) in order.orderDetailList" :key="sku.skuId">
              <td width="60%">
                <div class="typographic">
                  <img :src="sku.imgUrl" style="width:100px;height:100px;">
                  <router-link :to="`/detail/${sku.skuId}`" class="block-text">{{sku.skuName}}</router-link>
                  <span>x{{sku.skuNum}}</span>
                  <a class="service">售后申请</a>
                </div>
              </td>
              <td :rowspan="order.orderDetailList.length" v-if="index==0" width="8%" class="center">{{order.consignee}}
              </td>
              <td :rowspan="order.orderDetailList.length" v-if="index==0" width="13%" class="center">
                <ul class="unstyled">
                  <li>总金额¥{{order.totalAmount}}.00</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td :rowspan="order.orderDetailList.length" v-if="index==0" width="8%" class="center">
                <a class="btn">{{order.orderStatusName}} </a>
              </td>
              <td :rowspan="order.orderDetailList.length" v-if="index==0" width="13%" class="center">
                <ul class="unstyled">
                  <li>
                    <a>评价|晒单</a>
                  </li>

                </ul>
              </td>
            </tr>
            <!-- <tr>
              <td width="50%">
                <div class="typographic">
                  <img src="~@/assets/img/myOrder/goods.png">
                  <a href="#" class="block-text">包邮 正品玛姬儿压缩面膜无纺布纸膜100粒 送泡瓶面膜刷喷瓶 新款</a>
                  <span>x1</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
            </tr> -->
          </tbody>
        </table>

      </div>
      <div class="choose-order">
        <!------分页器----->
        <pagination :pageNo="page" :pageSize="limit" :total="myOrder.total" :continues="5" @getPageNo="getPageNo" />
        
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="~@/assets/img/myOrder/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价
          </div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="~@/assets/img/myOrder/itemlike02.png" />
          </div>
          <div class="attr">
            Apple苹果iPhone 6s/6s Plus 16G 64G 128G
          </div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价
          </div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="~@/assets/img/myOrder/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
          </div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价
          </div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="~@/assets/img/myOrder/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
          </div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/pagination/pagination'

 export default {
  name: 'myOrder',
  data () {
   return {
    page: 1,
    limit: 3,
    myOrder: {}
   }
  },
  components: {
    Pagination
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      let result = await this.$API.reqMyOrderList(this.page,this.limit)
      console.log(result)
      if(result.code == 200){
        this.myOrder = result.data
      }else{
        alert(result.message)
      }
    },
    //获取当前页码
    getPageNo(page) {
      this.page = page
      this.getData()
    }
  }
 }
</script>

<style scoped>
.outer .order-main .container .order-body .order-right {
  float: right;
  width: 83.33%;
}
.outer .order-main .container .order-body .order-right .order-content {
  margin: 0 20px;
  color: #666;
}
.outer .order-main .container .order-body .order-right .order-content .title {
  margin-bottom: 22px;
  border: 1px solid #ddd;
}
.outer .order-main .container .order-body .order-right .order-content .title h3 {
  padding: 12px 10px;
  font-size: 15px;
  background-color: #f1f1f1;
}
.outer .order-main .container .order-body .order-right .order-content .chosetype {
  margin-bottom: 15px;
  color: #666;
}
.outer .order-main .container .order-body .order-right .order-content .chosetype table {
  border: 1px solid #e6e6e6;
  border-collapse: separate;
  border-radius: 2px;
  width: 100%;
  max-width: 100%;
  border-spacing: 0;
}
.outer .order-main .container .order-body .order-right .order-content .chosetype table th {
  padding: 6px 8px;
  color: #666;
  font-weight: 700;
  vertical-align: bottom;
  background-color: #f4f4f4;
  line-height: 18px;
  border-bottom: 1px solid #e6e6e6;
  font-size: 12px;
  text-align: left;
}
.outer .order-main .container .order-body .order-right .order-content .orders {
  font-size: 12px;
}
.outer .order-main .container .order-body .order-right .order-content .orders a:hover {
  color: #4cb9fc;
}
.outer .order-main .container .order-body .order-right .order-content .orders table {
  border: 1px solid #e6e6e6;
  border-collapse: collapse;
  border-radius: 2px;
  width: 100%;
  margin-bottom: 18px;
  max-width: 100%;
}
.outer .order-main .container .order-body .order-right .order-content .orders table th {
  padding: 6px 8px;
  line-height: 18px;
  text-align: left;
  vertical-align: bottom;
  background-color: #f4f4f4;
  font-size: 12px;
  color: #666;
}
.outer .order-main .container .order-body .order-right .order-content .orders table th .pull-right {
  float: right;
  cursor: pointer;
}
.outer .order-main .container .order-body .order-right .order-content .orders table th .pull-right img {
  margin-right: 10px;
  vertical-align: middle;
}
.outer .order-main .container .order-body .order-right .order-content .orders table td {
  font-size: 12px;
  color: #666;
  padding: 6px 8px;
  line-height: 18px;
  text-align: left;
  vertical-align: middle;
  border: 1px solid #e6e6e6;
}
.outer .order-main .container .order-body .order-right .order-content .orders table td.center {
  text-align: center;
}
.outer .order-main .container .order-body .order-right .order-content .orders table td .typographic img {
  float: left;
  margin-right: 10px;
}
.outer .order-main .container .order-body .order-right .order-content .orders table td .typographic a {
  float: left;
  min-width: 80px;
  max-width: 250px;
  color: #e1251b;
}
.outer .order-main .container .order-body .order-right .order-content .orders table td .typographic a.service {
  color: #666;
}
.outer .order-main .container .order-body .order-right .order-content .orders table td .typographic span {
  float: left;
  min-width: 80px;
  max-width: 250px;
  text-align: center;
}
.outer .order-main .container .order-body .order-right .order-content .choose-order .pagination {
  margin: 38px 0;
}
.outer .order-main .container .order-body .order-right .order-content .choose-order .pagination ul {
  font-size: 0;
  display: inline-block;
}
.outer .order-main .container .order-body .order-right .order-content .choose-order .pagination ul li {
  display: inline-block;
  padding: 4px 9px;
  font-size: 14px;
  border: 1px solid #e0e9ee;
}
.outer .order-main .container .order-body .order-right .order-content .choose-order .pagination ul li.prev,
.outer .order-main .container .order-body .order-right .order-content .choose-order .pagination ul li.next {
  background-color: #fafafa;
}
.outer .order-main .container .order-body .order-right .order-content .choose-order .pagination ul li.prev {
  border-right-color: #28a3ef;
}
.outer .order-main .container .order-body .order-right .order-content .choose-order .pagination ul li.page {
  border-color: #28a3ef;
  border-left: 0;
}
.outer .order-main .container .order-body .order-right .order-content .choose-order .pagination ul li.page.actived {
  background-color: #28a3ef;
}
.outer .order-main .container .order-body .order-right .order-content .choose-order .pagination ul li.page.actived a {
  color: #fff;
}
.outer .order-main .container .order-body .order-right .order-content .choose-order .pagination div {
  display: inline-block;
  font-size: 14px;
  color: #333;
}
.outer .order-main .container .order-body .order-right .like {
  border: 1px solid #ddd;
  margin: 15px 20px;
}
.outer .order-main .container .order-body .order-right .like .kt {
  border-bottom: 1px solid #ddd;
  background: #f1f1f1;
  color: #666;
  margin: 0;
  padding: 12px;
  font-size: 15px;
}
.outer .order-main .container .order-body .order-right .like .like-list {
  padding: 15px 11px;
  overflow: hidden;
}
.outer .order-main .container .order-body .order-right .like .like-list .likeItem {
  width: 25%;
  float: left;
}
.outer .order-main .container .order-body .order-right .like .like-list .likeItem .p-img {
  text-align: left;
}
.outer .order-main .container .order-body .order-right .like .like-list .likeItem .p-img img {
  width: 167px;
  height: 123px;
}
.outer .order-main .container .order-body .order-right .like .like-list .likeItem .attr {
  padding: 0 15px;
}
.outer .order-main .container .order-body .order-right .like .like-list .likeItem .price {
  padding: 0 15px;
  font-size: 16px;
  color: #c81623;
  margin-bottom: 20px;
}
.outer .order-main .container .order-body .order-right .like .like-list .likeItem .commit {
  padding: 0 15px;
}
</style>
