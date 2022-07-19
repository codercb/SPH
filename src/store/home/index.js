//home模块小仓库
import { reqCategory, reqBannerList, reqFloorList } from "@/api"
const state = {
  cateGoryList: [],
  bannerList: [],
  floorList: []
}
const mutations = {
  CATEGORYLIST(state, cateGoryList) {
    state.cateGoryList = cateGoryList
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  FLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
const actions = {
  //获取三级分类数据
  async cateGoryList({ commit }) {
    let result = await reqCategory()
    if (result.code == 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  //获取首页轮播图数据
  async getBannerList({ commit }) {
    let result = await reqBannerList()
    //console.log(result)
    if (result.code == 200) {
      commit('BANNERLIST', result.data)
    }
  },
  //获取首页floor数据
  async getFloorList({ commit }) {
    let result = await reqFloorList()
    //console.log(result.data)
    if (result.code == 200) {
      commit('FLOORLIST', result.data)
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}