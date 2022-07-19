<template>
  <div class="goods-list">
    <ul class="yui3-g">
      <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
        <div class="list-wrap">
          <div class="p-img">
            <router-link :to="{name:'detail',params:{skuId:goods.id}}"><img v-lazy="goods.defaultImg" /></router-link>
          </div>
          <div class="price">
            <strong>
              <em>¥</em>
              <i>{{ goods.price.toFixed(2) }}</i>
            </strong>
          </div>
          <div class="attr">
            <router-link :to="{name:'detail',params:{skuId:goods.id}}">{{ goods.title }}</router-link>
          </div>
          <div class="commit">
            <i class="command">已有<span>2000</span>人评价</i>
          </div>
          <div class="operate">
            <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
            <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'goodsList',
    props:['goodsList'],
    data() {
      return {

      }
    },
    
  }
</script>

<style scoped>
.outer .main .py-container .details .goods-list {
  margin: 20px 0;
}
.outer .main .py-container .details .goods-list ul {
  display: flex;
  flex-wrap: wrap;
}
.outer .main .py-container .details .goods-list ul li {
  height: 100%;
  width: 20%;
  margin-top: 10px;
  line-height: 28px;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .p-img {
  padding-left: 15px;
  width: 215px;
  height: 255px;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .p-img a {
  color: #666;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .p-img a img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .price {
  padding-left: 15px;
  font-size: 18px;
  color: #c81623;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .price strong {
  font-weight: 700;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .price strong i {
  margin-left: 0px;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .attr {
  padding-left: 15px;
  width: 85%;
  overflow: hidden;
  margin-bottom: 8px;
  min-height: 38px;
  cursor: pointer;
  line-height: 1.8;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .attr a {
  color: #333;
  text-decoration: none;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .commit {
  padding-left: 15px;
  height: 22px;
  font-size: 13px;
  color: #a7a7a7;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .commit span {
  font-weight: 700;
  color: #646fb0;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate {
  padding: 12px 15px;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate .sui-btn {
  display: inline-block;
  padding: 2px 14px;
  box-sizing: border-box;
  margin-bottom: 0;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 0;
  background-color: transparent;
  margin-right: 15px;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate .btn-bordered {
  min-width: 85px;
  background-color: transparent;
  border: 1px solid #8c8c8c;
  color: #8c8c8c;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate .btn-bordered:hover {
  border: 1px solid #666;
  color: #fff !important;
  background-color: #666;
  text-decoration: none;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate .btn-danger {
  border: 1px solid #e1251b;
  color: #e1251b;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate .btn-danger:hover {
  border: 1px solid #e1251b;
  background-color: #e1251b;
  color: white!important;
  text-decoration: none;
}

</style>
