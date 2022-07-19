import requests from "./request";
import mockRequests from './mockRequest';

//获取商品分类的数据
export const reqCategory = () => {
  //return关键字，千万别忘记书写，如果忘记书写，你在任意地方获取的都是undeinfed
  return requests({ method: 'get', url: '/product/getBaseCategoryList' });
}

//获取首页banner轮播图数据
export const reqBannerList = () => {
  return mockRequests({ method: 'get', url: '/banner' })
}

//获取首页floor组件数据
export const reqFloorList = () => {
  return mockRequests({ method: 'get', url: '/floor' })
}

//获取search页面数据
export const reqSearchInfo = (data) => {
  return requests({method:'post',url:'/list',data})
}

//获取商品详情数据
export const reqGoodsInfo = (skuId) => {
  //return requests({method:'get',url:'/item/'+ skuId})
  return requests({method:'get',url:`/item/${skuId}`})
}

//添加购物车
export const reqAddToCart = (skuId,skuNum) => {
  return requests({method:'post',url:`/cart/addToCart/${skuId}/${skuNum}`})
}

//获取购物车列表
export const reqCartList = () => {
  return requests({method:'get',url:'/cart/cartList'})
}

//删除购物车列表中的某一项
export const reqDeleteCartItem = (skuId) => {
  return requests({method:'delete',url:`/cart/deleteCart/${skuId}/`})
}

//修改购物车中商品的选中状态
export const reqUpdateCartChecked = (skuId,isChecked) => {
  return requests({method:'get',url:`/cart/checkCart/${skuId}/${isChecked}`})
}

//获取验证码
export const reqGetCode = (phone) => {
  return requests({method:'get',url:`/user/passport/sendCode/${phone}`})
}

//注册
export const reqRegister = (data) => {
  return requests({method:'post',url:'/user/passport/register',data})
}

//登录
export const reqLogin = (data) => {
  return requests({method:'post',url:'/user/passport/login',data})
}

//获取用户信息【通过token,由请求头带给服务器】
export const reqUserInfo = () => {
  return requests({method:'get',url:'/user/passport/auth/getUserInfo'})
}

//退出登录
export const reqLoginOut = () => {
  return requests({method:'get',url:'/user/passport/logout'})
}

//获取用户地址信息
export const reqAddressInfo = () => {
  return requests({method:'get',url:'/user/userAddress/auth/findUserAddressList'})
}

//获取商品清单
export const reqShopInfo = () => {
  return requests({method:'get',url:'/order/auth/trade'})
}

//提交订单
export const reqSubmitOrder = (tradeNo,data) => {
  return requests({method:'post',url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data})
}

//获取支付信息
export const reqPayInfo = (orderId) => {
  return requests({method:'get',url:`/payment/weixin/createNative/${orderId}`})
}

//获取支付订单状态
export const reqPayStatus = (orderId) => {
  return requests({method:'get',url:`/payment/weixin/queryPayStatus/${orderId}`})
}

//获取我的订单列表
export const reqMyOrderList = (page,limit) => {
  return requests({method:'get',url:`/order/auth/${page}/${limit}`})
} 