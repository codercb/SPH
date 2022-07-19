import { reqCartList,reqDeleteCartItem,reqUpdateCartChecked } from "@/api"
const state = {
  cartList: []
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  async getCartList({ commit }) {
    let result = await reqCartList()
    if (result.code == 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  //删除购物车某一项
  async deleteCartItem({commit},skuId) {
    let result = await reqDeleteCartItem(skuId)
    //console.log(result)
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  //修改购物车中商品的选中状态
  async updateCartChecked({commit},{skuId,isChecked}) {
    let result = await reqUpdateCartChecked(skuId,isChecked)
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  //删除选中的商品
  deleteCheckedCart({dispatch,getters}) {
    let promiseAll = []
    //获取购物车中全部的商品
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartItem',item.skuId) : ''
      //将每一次返回的promise添加到数组中
      promiseAll.push(promise)
    });
    //promise.all([p1,p2,...]) 返回一个结果，如果都成功则返回成功 如果有一个失败则返回失败
    return Promise.all(promiseAll)
  },
  //全选
  updateCheckedAll({dispatch,getters},isChecked) {
    let promiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = dispatch('updateCartChecked',{skuId:item.skuId,isChecked})
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  },
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}