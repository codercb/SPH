import { reqAddressInfo,reqShopInfo } from "@/api"
const state = {
  addressInfo: [],
  shopInfo: {}
}
const mutations = {
  ADDRESSINFO(state,addressInfo) {
    state.addressInfo = addressInfo
  },
  SHOPINFO(state,shopInfo) {
    state.shopInfo = shopInfo
  }
}
const actions = {
  async getAddressInfo({commit}) {
    let result = await reqAddressInfo()
    //console.log(result)
    if(result.code == 200){
      commit('ADDRESSINFO',result.data)
    }
  },
  async getShopInfo({commit}) {
    let result = await reqShopInfo()
    console.log(result)
    if(result.code == 200){
      commit('SHOPINFO',result.data)
    }
  }
}
const getters = {
  shopList(state) {
    return state.shopInfo.detailArrayList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}