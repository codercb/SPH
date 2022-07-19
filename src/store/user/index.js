import { reqGetCode,reqRegister,reqLogin,reqUserInfo,reqLoginOut } from '@/api';
const state = {
  code: '',
  token: localStorage.getItem('TOKEN'),
  userInfo: {}
}
const mutations = {
  GETCODE(state,code) {
    state.code = code
  },
  LOGINSUCCESS(state,token) {
    state.token = token
  },
  USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR(state) {
    //清空仓库中token、userInfo
    state.token = ''
    state.userInfo = {}
    //本地存储token清空
    localStorage.removeItem('TOKEN')
  }
}
const actions = {
  async getCode({commit},phone) {
    let result = await reqGetCode(phone)
    if(result.code == 200){
      commit('GETCODE',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  async registerSuccess({commit},data = {}) {
    let result = await reqRegister(data)
    //console.log(result)
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  async reqLoginSuccess({commit},data = {}) {
    let result = await reqLogin(data)
    if(result.code == 200){
      commit('LOGINSUCCESS',result.data.token)
      //持久化存储token
      localStorage.setItem('TOKEN',result.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  //获取用户信息
  async getUserInfo({commit}) {
    let result = await reqUserInfo()
    //console.log(result)
    if(result.code == 200){
      commit('USERINFO',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  //退出登录
  async exitLogin({commit}) {
    let result = await reqLoginOut()
    //console.log(result)
    if(result.code == 200){
      commit('CLEAR')
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
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