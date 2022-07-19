import { reqGoodsInfo,reqAddToCart } from "@/api";
import { getUUID } from "@/untils/uuid_token"
const state = {
  goodsInfo: {},
  //游客临时身份
  uuid_token:getUUID()
}

const mutations = {
  GETGOODSINFO(state,goodsInfo) {
    state.goodsInfo = goodsInfo
  },
 
}

const actions = {
  async getGoodsInfo({commit},skuId) {
    let result = await reqGoodsInfo(skuId)
    //console.log(result.data)
    if(result.code == 200){
      commit('GETGOODSINFO',result.data)
    }
  },

  async addToCart({commit},{skuId,skuNum}) {
    let result = await reqAddToCart(skuId,skuNum)
    //console.log(result)
    if(result.code == 200){
      //返回成功的标记
      return 'ok'
    }else{
      //返回失败的标记
      return Promise.reject(new Error('fail'))
    }
  }
}

const getters = {
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },

  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  //商品售卖属性
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}