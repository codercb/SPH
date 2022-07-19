import { reqSearchInfo } from "@/api"

//search模块小仓库
const state = {
  searchInfo: {}
}
const mutations = {
  SEARCHINFO(state, searchInfo) {
    state.searchInfo = searchInfo
  }
}
const actions = {
  async getSearchInfo({ commit }, params = {}) {
    let result = await reqSearchInfo(params)
    //console.log(result.data)
    if (result.code == 200) {
      commit('SEARCHINFO', result.data)
    }
  }
}
const getters = {
  goodsList(state) {
    return state.searchInfo.goodsList || []
  },
  trademarkList(state) {
    return state.searchInfo.trademarkList || []
  },
  attrsList(state) {
    return state.searchInfo.attrsList || []
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}