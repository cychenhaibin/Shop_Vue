# 项目名

## 电商网站

项目部署服务器地址：http://47.108.196.186/

后端接口文档：[https://www.apifox.cn/apidoc/shared-c05cb8d7-e591-4d9c-aff8-11065a0ec1de/api-67132167](https://www.apifox.cn/apidoc/shared-c05cb8d7-e591-4d9c-aff8-11065a0ec1de/api-67132167)<br>接口来自黑马的小兔鲜
## 技术栈

工程化构建工具：Vue-cli -> Vite 

数据状态管理：VueX -> Pinia 

组件库：Element -> ElementPlus 

开发框架：Vue2 选项式 -> Vue3 组合式API 

路由管理：Vue-Router 

实用函数应用：VueUse

## 实现功能

### **基础功能**（全部实现）

- 用户注册
- 用户登录
- 退出登录
- 用户个人主页
- 用户信息修改
- 商家发布商品信息
- 用户查看商品
- 用户将商品加入购物车
- 用户购买商品

### 亮点

- 保持登录状态
- 边界条件的考虑
- 逻辑复用
- 用户购买记录
- 图片等资源懒加载
- 吸顶导航交互实现
- 轮播图
- Pinia优化重复请求
- 面包屑导航
- 小图切换大图、放大镜
- 第三方SKU组件
- 支付倒计时显示
- 调用沙箱支付接口
- 订单状态
- 项目部署到了服务器
  
# 整体项目介绍

## 一、项目初始化

### 1、项目创建

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/abbc09a7-805d-4763-bf91-56f2eace0bfb)

<br>

### 2、elementPlus按需导入

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/e5f7e09e-635d-4341-8e9a-2fe5aea35895)

<br>

### 3、项目主题色与scss样式自动导入（蓝色改绿色）

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/55fbc8c4-9c4c-4036-9606-725c9b0c70d7)

<br>

### 4、axios配置

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/f590cf96-3ab0-41ad-9c27-b544f968dc3d)


- axios请求拦截器，进行token身份验证
- axios响应拦截器，进行错误的统一提示，token失效的处理等

<br>

### 5、项目路由设置

- 一级路由

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/a3e0b1ea-f70f-454d-8fa7-8c67d29fa076)

  - views/Layout/index.vue
  - views/Login/index.vue

- 二级路由

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/79aa15b4-9935-452a-bf97-cc45c3575d3c)


  - views/Home/index.vue
  - views/Category/index.vue

- 渲染显示：RouterView

<br>

## 二、Layout布局结构

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/86f58b80-67e2-42ed-b038-d564fcab26be)

<br>

### 1、需求分析与搭建组件结构

目录结构

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/ab71e592-fc32-4331-adf2-be5d9619c2b1)

- 导航组件：LayoutNav

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/5b59c4da-c4d4-4cc8-b5fb-09c98f2a70df)

- 头部组件：LayoutHeader

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/6120ab6d-bfb5-4a38-ad13-1d9e8c21c38c)


- 底部组件：LayoutFooter

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/465ecc75-cc73-4eb6-aac5-002aa1ab6e90)

<br>

### 2、阿里字体图标渲染

字体图标采用的是阿里的字体图标库

```
<link rel="stylesheet" href="//at.alicdn.com/t/font_2143783_iq6z4ey5vu.css">
```

阿里图标矢量图 

https://www.iconfont.cn

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/95da9b9f-1751-408d-beaa-f707fbd1aea8)

<br>


### 3、Header导航动态渲染

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/1228623b-5339-4c71-b5fc-94a1dbbc767e)


- apis/layout.js

<br>

### 4、吸顶导航交互实现

安装依赖

依赖官网官网：https://www.vueusejs.com/

在Sensors里 可以看到监视滚动的函数 useScroll

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/35f147d9-c6e1-40da-a498-30436f3ab36c)

核心逻辑：根据滚动距离判断当前show类名是否显示，大于78显示，小于78，不显示

- 顶吸导航LayoutFixed
- 实现顶吸交互

```vue
<script setup>
import {useScroll} from "@vueuse/core";
import {useCategoryStore} from "@/stores/categoryStore.js";

const {y} = useScroll(window);
const categotyStore = useCategoryStore();
</script>

<template>
  <div class="app-header-sticky" :class="{show:y>78}">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 导航区域 -->
      <ul class="app-header-nav ">
        <li class="home">
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li v-for="item in categotyStore.categoryList" :key="item.id">
          <RouterLink active-class="active" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        </li>

      </ul>

      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>
```

<br>


### 5、Pinia优化重复请求

优化设计

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/fa248461-6401-4f99-b604-fd41e901baec)

- stoes/categoryStore.js

  Header导航动态渲染、和顶吸，使用一个异步函数从后端 API 获取类别数据

  ```javascript
  import {getCategoryAPI} from "@/apis/layout.js";
  
  export const useCategoryStore = defineStore('category', () => {
    const categoryList = ref([]);
    const getCategory = async () => {
      const res = await getCategoryAPI();
      categoryList.value = res.result;
    }
    onMounted(()=>getCategory())
  
    return { categoryList, getCategory }
  })
  ```

<br>

## 三、Home页面

### 1、需求分析与搭建组件结构

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/0085c110-6967-4291-87ce-1a1551ab091d)


- HomeCategory：左侧分类
- HomeBanner：轮播图
- HomeNew：新鲜好物
- HomeHot：人气推荐
- HomeProduct：产品列表

<br>

### 2、实现图片懒加载

directives/index.js

```javascript
import {useIntersectionObserver} from "@vueuse/core";

export const lazyPlugin = {
    install(app){
        // 懒加载
        app.directive('img-lazy',{
            //el:指令绑定元素 img
            //binding:binding.value 指令=后面表达式的值 图片url
            mounted(el,binding){
                //console.log(el,binding.value)
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        //console.log(isIntersecting);
                        if (isIntersecting) {
                            el.src = binding.value;
                            stop();
                        }
                    },
                )
            }
        })
    }
}
```

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/3526198a-8620-4646-94e1-51bd72b7d272)

<br>

### 3、封装Goodsitem组件

首页、一级分类页面、二级分类页面大量的图片组件封装

数据入口：商品参数入口

```vue
<script setup>
defineProps({
  good: {
    type: Object,
    default: () => { }
  }
})
</script>
```

```vue
<template>
  <RouterLink :to="`/detail/${good.id}`" class="goods-item">
    <img v-img-lazy="good.picture" alt="" />
    <p class="name ellipsis">{{ good.name }}</p>
    <p class="desc ellipsis">{{ good.desc }}</p>
    <p class="price">&yen;{{ good.price }}</p>
  </RouterLink>
</template>
```

<br>

## 四、一级分类页

### 1、一级面包屑导航

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/30f05e75-6b25-46ec-95f7-02a8e87245e1)


```javascript
import {onMounted, ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {getTopCategoryAPI} from "@/apis/category.js";

export function useCategory() {
    const categoryData = ref({});
    const route = useRoute();
    const getCategory = async (id) => {
        // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
        //console.log(route.params.id);
        const res = await getTopCategoryAPI(id)
        categoryData.value = res.result
    }
    onMounted(()=>getCategory(route.params.id))

    onBeforeRouteUpdate((to)=>{
        getCategory(to.params.id)
    })
    return {
        categoryData
    }
}
```



```vue
<div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
```

<br>

### 2、路由缓存及滚动行为

```javascript
 onBeforeRouteUpdate((to)=>{
        getCategory(to.params.id)
    })
    return {
        categoryData
    }
```

每次刷新时会回到最上面

```
scrollBehavior(){
    return{
      top:0
    }
  }
```

<br>

### 3、业务逻辑函数拆分

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/b8828663-5a59-46ed-9f53-b76a0155e2f1)


![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/db4a2e2d-88c2-4bfc-9aa2-db619f6caebf)

<br>

### 4、分类列表渲染

```html
<!-- 分类产品图片 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <RouterLink to="/">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <!-- 分类产品列表 -->
      <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
        </div>
      </div>
```

数据结构分析

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/a07cc85c-0d66-435e-8019-838a015feb04)

<br>


## 五、二级分类页

### 1、二级面包屑导航

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/0c05f94c-77e4-4105-b896-79cce3f2cda2)

```vue
<div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${filterData.prentId}` }">
          {{ filterData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ filterData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
```

<br>

### 2、数据渲染

请求数据如下

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/dab8fa15-46d1-4798-b080-72aa40600b73)

<br>

### 3、列表的无限加载

element-plus 

https://element-plus.org/zh-CN/component/infinite-scroll.html#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95


基础思路

1. 触底条件满足之后 page++，拉取下一页数据
2. 新老数据做数组拼接
3. 判断是否已经全部加载完毕，停止监听

```vue
const disabled = ref(false);
const load = async () => {
  // 获取下一页的数据
  reqData.value.page++;
  const res = await getSubCategoryAPI(reqData.value);
  //新加载的数据与老数据进行拼接合并
  goodList.value = [...goodList.value, ...res.result.items];
  // 加载完毕 停止监听
  if (res.result.items.length === 0) {
    disabled.value = true
  }
}
```

```vue
<div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
```

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/fdf7e1a6-0b6d-43b1-8448-da45ef0bf03b)

<br>

## 六、详情页Detail/index.vue

### 1、路由

```javascript
{
    path: 'detail/:id',
    component: Detail
},
```

<br>

### 2、数据渲染

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/df22970f-edcb-4244-8b5a-a5c619e2a2b7)


数据分析

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/d567864a-33b0-40fa-8a57-25ec5fee573f)

<br>

### 3、热榜组件

```vue
<div class="goods-aside">
              <DetailHot :hot-type="1"/>
              <DetailHot :hot-type="2"/>
            </div>
```

```vue
<script setup>
import { getHotGoodsAPI } from '@/apis/detail'
import { useRoute } from 'vue-router'

// 设计props参数 适配不同的title和数据
const props = defineProps({
  hotType: {
    type: Number
  }
})

// 适配title 1 - 24小时热榜  2-周热榜
const TYPEMAP = {
  1: '24小时热榜',
  2: '周热榜'
}

const title = computed(() => {
  return TYPEMAP[props.hotType]
})

const goodList = ref([])
const route = useRoute()
const getHotList = async () => {
  const res = await getHotGoodsAPI({
    id: route.params.id,
    type: props.hotType
  })
  goodList.value = res.result
}
onMounted(()=>getHotList())
</script>
```

```vue
<div class="goods-hot">
    <h3> {{ title }} </h3>
    <!-- 商品区块 -->
    <RouterLink :to="`/detail/${item.id}`" class="goods-item" v-for="item in goodList" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
```

<br>

### 4、小图切换大图、放大镜

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/241f2d05-bb07-465b-aa50-079fc4d61bab)


![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/d1b60af3-7f47-44d3-b63c-22223a40b265)


```vue
<script setup>
import {useMouseInElement} from "@vueuse/core";
// 图片列表
defineProps({
  imageList:{
    type:Array,
    default:()=>[]
  }
})

// 1.小图切换大图显示
const activeIndex = ref(0)

const enterHandler = (i) => {
  //console.log(i)
  activeIndex.value = i;
}

// 2. 获取鼠标相对位置
const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)

//算法
// 3. 控制滑块跟随鼠标移动（监听elementX/Y变化，一旦变化 重新设置left/top）
const left = ref(0)
const top = ref(0)

const positionX = ref(0)
const positionY = ref(0)

watch([elementX, elementY, isOutside], () => {

  // 如果鼠标没有移入到盒子里面 直接不执行后面的逻辑
  if (isOutside.value) return

  // 有效范围内控制滑块距离
  // 横向
  if (elementX.value > 100 && elementX.value < 300) {
    left.value = elementX.value - 100
  }
  // 纵向
  if (elementY.value > 100 && elementY.value < 300) {
    top.value = elementY.value - 100
  }

  // 处理边界
  if (elementX.value > 300) { left.value = 200 }
  if (elementX.value < 100) { left.value = 0 }

  if (elementY.value > 300) { top.value = 200 }
  if (elementY.value < 100) { top.value = 0 }

  // 控制大图的显示
  positionX.value = -left.value * 2
  positionY.value = -top.value * 2
})


</script>
```

```vue
<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" :style="{ left: `${left}px`, top: `${top}px` }"
      v-show="!isOutside"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li v-for="(img, i) in imageList" :key="i"
      @mouseenter="enterHandler(i)" :class="{active:i===activeIndex}">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`,
      },
    ]" v-show="!isOutside"></div>
  </div>
</template>
```

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/4dfd30fd-3137-4db3-ac6b-82afe09248cf)

<br>

### 5、第三方SKU组件

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/12531cfc-1b2b-4f18-96a0-457969592fbe)


第三方组件：

问：在实际工作中，经常会遇到别人写好的组件，熟悉一个三方组件，首先重点看什么？
答：props和emit，props决定了当前组件接收什么数据，emit决定了会产出什么数据

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/773cb63e-fac9-406c-a075-13c4be468a93)


![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/6fc117bd-6f28-472e-b675-efa34cbf3e7d)


<br>

### 6、全局组件差异化配置

```javascript
import ImageView from './ImageView/index.vue'
import Sku from './sku/index.vue'
export const componentPlugin = {
    install (app) {
        // app.component('组件名字'，组件配置对象)
        app.component('ImageView', ImageView)
        app.component('Sku', Sku)
    }
}
```

<br>

## 七、注册登录

正确账号密码

账号：heima290
密码：hm#qd@23!

### 1、路由

```javascript
{
    path: '/login',
    component: Login
},
{
    path: '/register',
    component: Register
}
```

<br>

### 2、保持用户登录状态

- 安装pinia数据持久化插件

  ```
  npm i pinia-plugin-persistedstate
  ```

  

  ```javascript
  export const useUserStore = defineStore(
      'user',
      () => {
        // 1. 定义管理用户数据的state
        const userInfo = ref({})
        const cartStore = useCartStore();
        // 2. 定义获取接口数据的action函数
        const getUserInfo = async (user) => {
          const res = await loginAPI(user)
          userInfo.value = res.result
        }
      
        // 3. 以对象的格式把state和action return
        return {
          userInfo,
          getUserInfo,
        }
      },
      {
          persist:true
      }
  )
  ```

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/745f92c7-a1f2-4b48-aa3c-f8311ba7defe)


<br>

### 3、axios拦截器设置

拦截器处理错误提示

```
try {
  const res = await loginAPI({account, password});
  ElMessage({type:'success',message:'登录成功'})
  router.replace({path: '/'})
}catch (e) {
  console.log(e)
  ElMessage({type:'error',message:e.response.data.message})
}
```

error的具体封装消息

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/1797a413-9ad2-4619-8fc0-788f5e57f31b)



- 请求拦截器携带token

  ```javascript
  http.interceptors.request.use(config => {
      const userStore = useUserStore()
      const token = userStore.userInfo.token;
      if (token){
          config.headers.Authorization = `Bearer ${token}`
      }
      return config
  }, e => Promise.reject(e))
  ```

  ![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/060b6058-8fc0-40ea-adb1-66574fcacab2)



- 响应拦截器处理token失效

  ```javascript
  http.interceptors.response.use(res => res.data, e => {
      // 统一错误提示
      ElMessage({type: 'error', message: e.response.data.message})
      //401token失效处理
      const userStore = useUserStore();
      if(e.response.status === 401){
          userStore.clearUserInfo()
          router.push('/login')
      }
      return Promise.reject(e)
  })
  ```

<br>

## 八、结算支付

### 1、创建订单并跳转支付

- 路由

  ```javascript
  {
      path: 'pay',
      component: Pay
  },
  ```

  ```vue
  const createOrder = async () => {
    const res = await createOrderAPI({
      deliveryTimeType: 1,
      payType: 1,
      payChannel: 1,
      buyerMessage: '',
      goods: checkInfo.value.goods.map(item => {
        return {
          skuId: item.skuId,
          count: item.count
        }
      }),
      addressId: curAddress.value.id
    })
    const orderId = res.result.id
    console.log(orderId)
    router.push({
      path: '/pay',
      query: {
        id: orderId
      }
    })
  }
  ```

<br>

### 2、支付倒计时显示

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/d0b4cdec-c4a7-4c12-89bf-6a07469d8f7b)



```javascript
// 封装倒计时逻辑函数
import dayjs from 'dayjs'
export const useCountDown = () => {
    // 1. 响应式的数据
    let timer = null
    const time = ref(0)
    // 格式化时间 为 xx分xx秒
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    // 2. 开启倒计时的函数
    const start = (currentTime) => {
        // 开始倒计时的逻辑
        // 核心逻辑的编写：每隔1s就减一
        time.value = currentTime
        timer = setInterval(() => {
            time.value--
        }, 1000)
    }
    // 组件销毁时清除定时器
    onUnmounted(() => {
        timer && clearInterval(timer)
    })
    return {
        formatTime,
        start
    }
}
```

<br>

### 3、调用沙箱支付接口

```javascript
// 支付地址
const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const backURL = 'http://127.0.0.1:5173/paycallback'
const redirectUrl = encodeURIComponent(backURL)
const payUrl = `${baseURL}pay/aliPay?orderId=${route.query.id}&redirect=${redirectUrl}`
```

账号：askgxl8276@sandbox.com

登录密码：111111

支付密码：111111

<br>

## 九、个人中心

![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/c6d78548-aa2c-4b2f-91f2-7ba8d8850b5b)



![image](https://github.com/cychenhaibin/Shop_Vue/assets/117504781/af76fe97-f331-4539-935e-c2ff622e7c2a)

<br>

### 1、订单状态

```vue
const fomartPayState = (payState) => {
  const stateMap = {
    1: '待付款',
    2: '待发货',
    3: '待收货',
    4: '待评价',
    5: '已完成',
    6: '已取消'
  }
  return stateMap[payState]
}
```

<br>

### 2、tab栏切换

```
const tabChange = (type) => {
  params.value.orderState = type
  getOrderList()
}
```
<br>

### 因为没有写注册的接口，所以注册信息无法写入数据库
