<template>
  <div class="outer">
    <type-nav/>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeTrade">×</i></li>
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{attrValue.split(":")[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>
        <!--selector-->
        <search-select @tradeInfo="tradeInfo" @attrInfo="attrInfo"/>
        <!--details-->
        <div class="details clearfix">
          <!-----排序----->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav" @click="sortClick">
                <li :class="{active:isOne}">
                  <a :data-index="1">综合 <span v-show="isOne"><span v-show="isAsc">↑</span><span v-show="isDesc">↓</span></span></a>
                </li>
                <li :class="{active:isTwo}">
                  <a :data-index="2">价格 <span v-show="isTwo"><span v-show="isAsc">↑</span><span v-show="isDesc">↓</span></span></a>
                </li>
                <li :class="{active:isThree}">
                  <a :data-index="3">新品 <span v-show="isThree"><span v-show="isAsc">↑</span><span v-show="isDesc">↓</span></span></a>
                </li>
                
              </ul>
            </div>
          </div>
          <!-----商品列表----->
          <goods-list :goodsList = "goodsList" />
          <!------分页器------>
          <pagination :pageNo="searchParams.pageNo" 
                      :pageSize="searchParams.pageSize" 
                      :total="total" 
                      :continues="5" 
                      @getPageNo = "getPageNo"/>
        </div>
        <!--hotsale-->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="~@/assets/img/search/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="~@/assets/img/search/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="~@/assets/img/search/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="~@/assets/img/search/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TypeNav from '@/components/typeNav/TypeNav'
import SearchSelect from './child/searchSelect'
import GoodsList from './child/goodsList'
import Pagination from '@/components/pagination/pagination'

import { mapGetters,mapState } from 'vuex'

export default {
  name: 'search',
  data() {
    return {
      searchParams: {
        category1Id: "", //一级分类的id
        category2Id: "", //二级分类的id
        category3Id: "", //三级分类的id
        categoryName: "", //商品的名字
        keyword: "", //用户搜索的关键字
        props: [], //商品属性的搜索条件
        trademark: "", //品牌的搜索条件
        order: "1:desc", //排序的参数 【默认初始值:1:desc】
        pageNo: 1, //当前分页器的页码  【默认初始值:1】
        pageSize: 5, //代表当前一页显示几条数据 【默认初始值:10】
      }
    }
  },
  components: {
    TypeNav,
    SearchSelect,
    GoodsList,
    Pagination
  },
  beforeMount() {
    //商品分类搜索条件
    Object.assign(this.searchParams,this.$route.query,this.$route.params)
  },
  mounted() {
    this.getData()
  },
  computed:{
    //获取商品列表
    ...mapGetters(['goodsList']),

    //获取分页总条数
    ...mapState({
      total: state => state.search.searchInfo.total
    }),

    isOne() {
      return this.searchParams.order.indexOf('1') != -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') != -1
    },
    isThree() {
      return this.searchParams.order.indexOf('3') != -1
    },
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1
    }
  },
  methods: {
    getData() {
      this.$store.dispatch('getSearchInfo',this.searchParams)
    },
    //删除分类名称
    removeCategoryName() {
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      
      //请求数据
      this.getData();

      //修改地址栏
      if(this.$route.params){
        this.$router.push({name:'search',params:this.$route.params})
      }else{
        this.$router.push({name:'search'})
      }
      
    },
    //删除keyword
    removeKeyword() {
      this.searchParams.keyword = undefined

      //请求数据
      this.getData();

      //修改地址栏
      if(this.$route.query){
        this.$router.push({name:'search',query:this.$route.query})
      }else{
        this.$router.push({name:'search'})
      }
      
      //通知兄弟组件Header清除keyword
      this.$bus.$emit('clearKeyword')

    },
    //选择品牌修改面包屑
    tradeInfo(trade) {
      this.searchParams.trademark = `${trade.tmId}:${trade.tmName}`
      this.getData()
    },

    //删除trade面包屑
    removeTrade() {
      this.searchParams.trademark = undefined
      this.getData()
    },

    //商品售卖属性面包屑
    attrInfo(attr,attrValue) {
      let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`
      //数组去重
      if(this.searchParams.props.indexOf(prop) == -1){
        this.searchParams.props.push(prop)
      }
      this.getData()
    },

    //删除商品售卖属性面包屑
    removeAttr(index) {
      this.searchParams.props.splice(index,1)
      this.getData()
    },

    //排序
    sortClick(event) {
      //console.log(event.target.dataset.index)
      let index = event.target.dataset.index;
      let initNum = this.searchParams.order.split(":")[0]
      let initSort = this.searchParams.order.split(":")[1]
      let newOrder = ''
      if(index == initNum){
        newOrder = `${initNum}:${initSort=='desc'?'asc':'desc'}`
      }else{
        newOrder = `${index}:${'desc'}`
      }

      this.searchParams.order = newOrder
      
      this.getData()
    },
    //获取当前页码
    getPageNo(pageNum) {
      this.searchParams.pageNo = pageNum
      this.getData()
    }
  },
  watch: {
    $route(newValue,oldValue){
      //合并参数对象
      Object.assign(this.searchParams,this.$route.query,this.$route.params)

      //请求数据
      this.getData();

      //清空1、2、3级分类id
      this.searchParams.category1Id = ''
      this.searchParams.category2Id = ''
      this.searchParams.category3Id = ''
    }
  }
}
</script>

<style scoped>
.outer .main {
  margin: 10px 0;
}
.outer .main .py-container {
  width: 1200px;
  margin: 0 auto;
}
.outer .main .py-container .bread {
  margin-bottom: 5px;
  overflow: hidden;
}
.outer .main .py-container .bread .sui-breadcrumb {
  padding: 3px 15px;
  margin: 0;
  font-weight: 400;
  border-radius: 3px;
  float: left;
}
.outer .main .py-container .bread .sui-breadcrumb li {
  display: inline-block;
  line-height: 18px;
}
.outer .main .py-container .bread .sui-breadcrumb li a {
  color: #666;
  text-decoration: none;
}
.outer .main .py-container .bread .sui-breadcrumb li a:hover {
  color: #4cb9fc;
}
.outer .main .py-container .bread .sui-tag {
  margin-top: -5px;
  list-style: none;
  font-size: 0;
  line-height: 0;
  padding: 5px 0 0;
  margin-bottom: 18px;
  float: left;
}
.outer .main .py-container .bread .sui-tag .with-x {
  font-size: 12px;
  margin: 0 5px 5px 0;
  display: inline-block;
  overflow: hidden;
  color: #000;
  background: #f7f7f7;
  padding: 0 7px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #dedede;
  white-space: nowrap;
  transition: color 400ms;
  cursor: pointer;
}
.outer .main .py-container .bread .sui-tag .with-x i {
  margin-left: 10px;
  cursor: pointer;
  font: 400 14px tahoma;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.outer .main .py-container .bread .sui-tag .with-x:hover {
  color: #28a3ef;
}

.outer .main .py-container .details {
  margin-bottom: 5px;
}
.outer .main .py-container .details .sui-navbar {
  overflow: visible;
  margin-bottom: 0;
}
.outer .main .py-container .details .sui-navbar .filter {
  min-height: 40px;
  padding-right: 20px;
  background: #fbfbfb;
  border: 1px solid #e2e2e2;
  padding-left: 0;
  border-radius: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
}
.outer .main .py-container .details .sui-navbar .filter .sui-nav {
  position: relative;
  left: 0;
  display: block;
  float: left;
  margin: 0 10px 0 0;
}
.outer .main .py-container .details .sui-navbar .filter .sui-nav li {
  float: left;
  line-height: 18px;
}
.outer .main .py-container .details .sui-navbar .filter .sui-nav li a {
  display: block;
  cursor: pointer;
  padding: 11px 15px;
  color: #777;
  text-decoration: none;
}
.outer .main .py-container .details .sui-navbar .filter .sui-nav li.active a {
  background: #e1251b;
  color: #fff;
}

.outer .main .py-container .hot-sale {
  margin-bottom: 5px;
  border: 1px solid #ddd;
}
.outer .main .py-container .hot-sale .title {
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  border-bottom: 1px solid #ddd;
  background: #f1f1f1;
  color: #333;
  margin: 0;
  padding: 5px 0 5px 15px;
}
.outer .main .py-container .hot-sale .hot-list {
  padding: 15px;
}
.outer .main .py-container .hot-sale .hot-list ul {
  display: flex;
}
.outer .main .py-container .hot-sale .hot-list ul li {
  width: 25%;
  height: 100%;
}
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .p-img,
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .price,
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .attr,
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .commit {
  padding-left: 15px;
}
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .p-img img {
  max-width: 100%;
  vertical-align: middle;
  border: 0;
}
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .attr {
  width: 85%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 8px;
  min-height: 38px;
  cursor: pointer;
  line-height: 1.8;
}
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .price {
  font-size: 18px;
  color: #c81623;
}
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .price strong {
  font-weight: 700;
}
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .price strong i {
  margin-left: -5px;
}
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .commit {
  height: 22px;
  font-size: 13px;
  color: #a7a7a7;
}
</style>
