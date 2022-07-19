import axios from 'axios'
//引入仓库模块，获取detail仓库中的uuid_token
import store from '@/store'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'

const requests = axios.create({
  baseURL: '/api',
  timeout: 5000
})

//请求拦截器
requests.interceptors.request.use((config) => {
  //进度条开始
  nprogress.start();
  //通过请求头把游客临时身份字符串带给服务器
  if(store.state.detail.uuid_token){
    config.headers.userTempId = store.state.detail.uuid_token
  }

  //通过请求头把token带给服务器
  if(store.state.user.token){
    config.headers.token = store.state.user.token
  }

  return config;
})

//响应拦截器
requests.interceptors.response.use((res) => {
  //进度条结束
  nprogress.done();
  return res.data;

},(err) => {
  //温馨提示:某一天发请求,请求失败,请求失败的信息打印出来
  alert(err.message);
  //终止Promise链
  return new Promise();
})

export default requests;