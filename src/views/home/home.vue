<template>
  <div id="home" class="outer">
    <type-nav />
    <list-container />
    <recommend />
    <rank />
    <like />
    <floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
    <brand />
  </div>
</template>

<script>
import TypeNav from '@/components/typeNav/TypeNav'
import ListContainer from '@/views/home/listContainer/listContainer'
import Recommend from '@/views/home/recommend/recommend'
import Rank from '@/views/home/rank/rank'
import Like from '@/views/home/like/like'
import Floor from '@/views/home/floor/floor'
import Brand from '@/views/home/brand/brand'

import { mapState } from 'vuex'

export default {
  name: 'home',
  data() {
    return {

    }
  },
  components: {
    TypeNav,
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    //派发action,获取floor组件数据
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
}
</script>

<style scoped>
</style>
