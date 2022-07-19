import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'

const requests = axios.create({
  baseURL: '/mock',
  timeout: 5000
})

//请求拦截器
requests.interceptors.request.use((config) => {
  //进度条开始
  nprogress.start();
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