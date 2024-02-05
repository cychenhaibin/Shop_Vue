# 项目名

## 电商网站

项目部署服务器地址：http://47.108.196.186/

后端接口文档：[https://www.apifox.cn/apidoc/shared-c05cb8d7-e591-4d9c-aff8-11065a0ec1de/api-67132167](https://www.apifox.cn/apidoc/shared-c05cb8d7-e591-4d9c-aff8-11065a0ec1de/api-67132167)

### 技术栈

工程化构建工具:Vue-cli -> Vite 

数据状态管理:VueX -> Pinia 

组件库:Element -> ElementPlus 

开发框架:Vue2 选项式 -> Vue3 组合式API 

路由管理：Vue-Router 

实用函数应用：VueUse

### 实现功能

##### **基础功能**（全部实现）

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

# 整体项目介绍

### 一、项目初始化

##### 1、项目创建

![image-20240205090923230](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205090923230.png)

##### 2、elementPlus按需导入

![image-20240205202914265](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205202914265.png)

##### 3、项目主题色与scss样式自动导入（蓝色改绿色）

![image-20240205202946685](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205202946685.png)

##### 4、axios配置

![image-20240205203010759](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205203010759.png)

- axios请求拦截器，进行token身份验证
- axios响应拦截器，进行错误的统一提示，token失效的处理等

##### 5、项目路由设置

- 一级路由

  ![image-20240205203055336](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205203055336.png)

  - views/Layout/index.vue
  - views/Login/index.vue

- 二级路由

  ![image-20240205203114351](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205203114351.png)

  - views/Home/index.vue
  - views/Category/index.vue

- 渲染显示：RouterView

### 二、Layout布局结构

![image-20240205203200425](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205203200425.png)

##### 1、需求分析与搭建组件结构

目录结构

![image-20240205203245927](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205203245927.png)

- 导航组件：LayoutNav

![image-20240205103118155](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205103118155.png)

- 头部组件：LayoutHeader

![image-20240205103149038](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205103149038.png)

- 底部组件：LayoutFooter

![image-20240205103247908](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205103247908.png)

##### 2、阿里字体图标渲染

字体图标采用的是阿里的字体图标库

```
<link rel="stylesheet" href="//at.alicdn.com/t/font_2143783_iq6z4ey5vu.css">
```

阿里图标矢量图 

https://www.iconfont.cn

![image-20240205203355543](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205203355543.png)

##### 3、Header导航动态渲染

![image-20240205203405226](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205203405226.png)

- apis/layout.js

##### 4、吸顶导航交互实现

安装依赖

依赖官网官网：https://www.vueusejs.com/

在Sensors里 可以看到监视滚动的函数 useScroll

![image-20240205203537794](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205203537794.png)

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



##### 5、Pinia优化重复请求

优化设计

![image-20240205203457639](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205203457639.png)

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

  

### 三、Home页面

##### 1、需求分析与搭建组件结构

![image-20240205203621310](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205203621310.png)

- HomeCategory：左侧分类
- HomeBanner：轮播图
- HomeNew：新鲜好物
- HomeHot：人气推荐
- HomeProduct：产品列表

##### 2、实现图片懒加载

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

![image-20240205203754656](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205203754656.png)

##### 3、封装Goodsitem组件

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

### 四、一级分类页

##### 1、一级面包屑导航

![image-20240205145204016](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205145204016.png)

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



##### 2、路由缓存及滚动行为

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



##### 3、业务逻辑函数拆分

![image-20240205203929070](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205203929070.png)

![image-20240205144850215](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205144850215.png)

##### 4、分类列表渲染

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

![image-20240205204055430](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205204055430.png)



### 五、二级分类页

##### 1、二级面包屑导航

![image-20240205145138520](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205145138520.png)

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

##### 2、数据渲染

请求数据如下

![image-20240205204231946](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205204231946.png)

##### 3、列表的无限加载

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

![image-20240205153131873](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205153131873.png)

### 六、详情页Detail/index.vue

##### 1、路由

```javascript
{
    path: 'detail/:id',
    component: Detail
},
```

##### 2、数据渲染

![image-20240205160119504](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205160119504.png)

数据分析

![image-20240205204507667](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205204507667.png)

##### 2、热榜组件

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

##### 3、小图切换大图、放大镜

##### ![image-20240205172551437](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205172551437.png)

![image-20240205172616525](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205172616525.png)

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

![image-20240205175028983](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205175028983.png)

##### 3、第三方SKU组件

![image-20240205153932975](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205153932975.png)

第三方组件：

问：在实际工作中，经常会遇到别人写好的组件，熟悉一个三方组件，首先重点看什么？
答：props和emit，props决定了当前组件接收什么数据，emit决定了会产出什么数据

![image-20240205183533452](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205183533452.png)

![image-20240205183640887](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205183640887.png)

##### 全局组件差异化配置

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

### 七、注册登录

正确账号密码参考

账号：heima290
密码：hm#qd@23!

##### 1、路由

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

##### 2、保持用户登录状态

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

![image-20240205205019004](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205205019004.png)

##### 3、axios拦截器设置

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

![image-20240205204919647](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205204919647.png)

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

  ![image-20240205205104543](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205205104543.png)

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

### 八、结算支付

##### 1、创建订单并跳转支付

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

  

##### 2、支付倒计时显示

![image-20240205201221598](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205201221598.png)

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



##### 3、调用沙箱支付接口

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

### 九、个人中心

![image-20240205205400050](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205205400050.png)

![image-20240205202237218](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20240205202237218.png)

##### 1、订单状态

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

##### 3、tab栏切换

```
const tabChange = (type) => {
  params.value.orderState = type
  getOrderList()
}
```

