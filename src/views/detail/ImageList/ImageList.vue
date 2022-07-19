<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide,index) in skuImageList" :key="slide.id">
        <img :src="slide.imgUrl" @click="addActive(index)" :class="{active:currentIndex == index}">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  name: "ImageList",
  props: ['skuImageList'],
  data() {
    return {
      currentIndex : 0
    }
  },
  methods: {
    addActive(index) {
      this.currentIndex = index
      //通知兄弟组件zoom改变图片索引值
      this.$bus.$emit('getIndex',index)
    }
  },
  watch: {
    skuImageList(newValue, oldValue) {
      this.$nextTick(() => {
        new Swiper(this.$refs.swiper, {
      
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },

          // 显示的slides数量
          slidesPerView : 3,
          // 设定slide与左边框的预设偏移量
          //slidesOffsetBefore : 10,
        })
      })
    }
  }
}
</script>

<style scoped>
.swiper-container {
  height: 56px;
  width: 402px;
  box-sizing: border-box;
  padding: 0 12px;
  margin-top: 5px;
}

.swiper-container .swiper-slide {
  width: 56px;
  height: 56px;
}

.swiper-container .swiper-slide img {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  padding: 2px;
  width: 50px;
  height: 50px;
  display: block;
}

.swiper-container .swiper-slide img.active {
  border: 2px solid #f60;
  padding: 1px;
}

.swiper-container .swiper-button-next {
  left: auto;
  right: 0;
}

.swiper-container .swiper-button-prev {
  left: 0;
  right: auto;
}

.swiper-container .swiper-button-next,
.swiper-container .swiper-button-prev {
  box-sizing: border-box;
  width: 12px;
  height: 56px;
  background: #ebebeb;
  border: 1px solid #cccccc;
  top: 0;
  margin-top: 0;
}

.swiper-container .swiper-button-next::after,
.swiper-container .swiper-button-prev::after {
  font-size: 12px;
}
</style>