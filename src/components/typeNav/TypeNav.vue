<template>
  <div class="outer">
    <div class="type-nav">
      <div class="container">
        <div @mouseleave="leaveShow" @mouseenter="enterShow">
          <h2 class="all">全部商品分类</h2>
          <transition name="sort">
            <div class="sort" v-show="show">
              <div class="all-sort-list2" @click="goSearch">
                <div class="item" v-for="(c1, index) in cateGoryList" :key="c1.categoryId"
                  :class="{ cur: currentIndex == index }">
                  <h3 @mouseenter="changeIndex(index)">
                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">
                      {{ c1.categoryName }}
                    </a>
                  </h3>
                  <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                      <dl class="fore">
                        <dt>
                          <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">
                            {{ c2.categoryName }}
                          </a>
                        </dt>
                        <dd>
                          <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                            <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">
                              {{ c3.categoryName }}
                            </a>
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </transition>
        </div>

        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>

      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
      show: true
    }
  },
  mounted() {
    //派发action，通知vuex发请求，获取数据，存储于仓库
    this.$store.dispatch('cateGoryList')
    //路由切换的时候,路由组件会被销毁重建
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      cateGoryList: state => state.home.cateGoryList
    })
  },
  methods: {
    // changeIndex(index) {
    //   this.currentIndex = index
    // },
    //鼠标移入事件节流操作
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    //鼠标移入全部商品分类显示
    enterShow() {
      this.show = true
    },
    //鼠标离开操作
    leaveShow() {
      this.currentIndex = -1
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
    goSearch(event) {
      if (this.$route.path == '/search') {
        this.show = false
      }
      let targetNode = event.target;
      //获取触发事件节点的自定义属性【a:data-categoryName】
      let { categoryname, category1id, category2id, category3id } = targetNode.dataset;
      //判断点击的是a【不管是1|2|3】
      if (categoryname) {
        var locations = {
          name: 'search',
          query: { categoryName: categoryname }
        }
        //一级分类的a
        if (category1id) {
          locations.query.category1Id = category1id;
        } else if (category2id) {
          //二级分类的a
          locations.query.category2Id = category2id;
        } else {
          //三级分类的a
          locations.query.category3Id = category3id;
        }
      }

      //点击商品分类按钮的时候,如果路径当中携带params参数,需要合并携带给search模块
      if (this.$route.params.keyword) {
        locations.params = this.$route.params;
      }
      //目前商品分类这里携带参数只有query参数
      this.$router.push(locations);

    }
    //跳转,需要合并参数
    //goSearch(categoryName, cateGoryId) {
    //  let location = { name: 'search', query: { categoryName, cateGoryId } }
    //  if (this.$route.params) {
    //    location.params = this.$route.params
    //  }
    //  this.$router.push(location)
    //}
  }
}
</script>

<style scoped>
.outer .type-nav {
  border-bottom: 2px solid #e1251b;
}

.outer .type-nav .container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;
}

.outer .type-nav .container .all {
  width: 210px;
  height: 45px;
  background-color: #e1251b;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

.outer .type-nav .container .nav a {
  height: 45px;
  margin: 0 22px;
  line-height: 45px;
  font-size: 16px;
  color: #333;
}

.outer .type-nav .container .sort {
  left: 0;
  top: 45px;
  width: 210px;
  height: 461px;
  position: absolute;
  background: #fafafa;
  z-index: 999;
}

.sort-enter {
  height: 0px;
}

.sort-enter-to {
  height: 461px;
}

.sort-enter-active {
  transition: all .5s linear;
}

.outer .type-nav .container .sort .all-sort-list2 .item h3 {
  line-height: 28px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  padding: 0 20px;
  margin: 0;
}

.outer .type-nav .container .sort .all-sort-list2 .item.cur h3 {
  background-color: skyblue;
}

.outer .type-nav .container .sort .all-sort-list2 .item h3 a {
  color: #333;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list {
  display: none;
  position: absolute;
  width: 734px;
  min-height: 460px;
  background: #f7f7f7;
  left: 210px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;
  zoom: 1;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl.fore {
  border-top: 0;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dt {
  float: left;
  width: 54px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd {
  float: left;
  width: 415px;
  padding: 3px 0 0;
  overflow: hidden;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}

/* .outer .type-nav .container .sort .all-sort-list2 .item:hover .item-list {
  display: block;
} */
</style>
