import Vue from 'vue'
import VueRouter from 'vue-router'
//引入store方便获取token、userInfo
import store from '@/store'

const Home = () => import('@/views/home/home')
const Search = () => import('@/views/search/search')
const Detail = () => import('@/views/detail/detail')
const Login = () => import('@/views/login/login')
const Register = () => import('@/views/register/register')
const AddCart = () => import('@/views/addCart/addCart')
const ShopCart = () => import('@/views/shopCart/shopCart')
const Trade = () => import('@/views/trade/trade')
const Pay = () => import('@/views/pay/pay')
const PaySuccess = () => import('@/views/paySuccess/paySuccess')
const Center = () => import('@/views/center/center')
//引入二级路由组件
const MyOrder = () => import('@/views/center/myOrder/myOrder')
const GroupOrder = () => import('@/views/center/groupOrder/groupOrder')

Vue.use(VueRouter)

//保存vueRouter原型对象的push方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push|replace
VueRouter.prototype.push = function(loacation,resolve,reject){
  if(resolve && reject){
    originPush.call(this,loacation,resolve,reject)
  }else{
    originPush.call(this,loacation,() => {},() => {})
  }
}

VueRouter.prototype.replace = function(loacation,resolve,reject){
  if(resolve && reject){
    originReplace.call(this,loacation,resolve,reject)
  }else{
    originReplace.call(this,loacation,() => {},() => {})
  }
}

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
      show: true
    }
  },
  {
    path: '/search/:keyword?',
    name: 'search',
    component: Search,
    meta: {
      title: '搜索',
      show: true
    }
  },
  {
    path: '/detail/:skuId',
    name: 'detail',
    component: Detail,
    meta: {
      title: '详情',
      show: true
    }
  },
  {
    path: '/addcart',
    name: 'addCart',
    component: AddCart,
    meta: {
      title: '加入购物车',
      show: true
    }
  },
  {
    path: '/shopcart',
    name: 'shopCart',
    component: ShopCart,
    meta: {
      title: '购物车',
      show: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
      show: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: '注册',
      show: false
    }
  },
  {
    path: '/trade',
    name: 'trade',
    component: Trade,
    meta: {
      title: '订单信息',
      show: true
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: Pay,
    meta: {
      title: '支付',
      show: true
    }
  },
  {
    path: '/paysuccess',
    name: 'paySuccess',
    component: PaySuccess,
    meta: {
      title: '支付成功',
      show: true
    }
  },
  {
    path: '/center',
    name: 'center',
    component: Center,
    meta: {
      title: '我的订单',
      show: true
    },
    children:[
      {
        path:'/center',
        redirect:'/center/myorder'
      },
      {
        path:'myorder',
        component: MyOrder
      },
      {
        path:'grouporder',
        component: GroupOrder
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  //滚动行为
  scrollBehavior(to, from, savePosition) {
    return {x:0,y:0}
  }
})

router.beforeEach(async (to,from,next) => {
  //页面标题
  document.title = to.matched[0].meta.title
  // next()
  // return false
  //处理登录存在的问题
  let token = store.state.user.token
  let userInfo = store.state.user.userInfo
  //已登录
  if(token){
    //已登录不能再进入login
    if(to.path == '/login'){
      next('/home')
    }else{
      //空对象为true，所以需要判断userInfo对象里面属性的值有没有
      if(userInfo.name){
        //已登录，userInfo信息也存在，直接跳转
        next()
      }else{
        try {
          //已登录，userInfo信息为空，则派发action获取userInfo的信息
          await store.dispatch('getUserInfo')
          //成功则跳转
          next()
        } catch (error) {
          //token失效，获取不到userInfo信息，清空本地token，vuex中的userInfo、token并跳转到login重新派发token
          await store.dispatch('exitLogin')
          //跳转到login
          next('/login')
        }
        
      }
    }
  }else{
    //未登录时问题处理
    //未登录
    next()
  }

})

export default router
