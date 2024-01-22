import axios from "axios";
import {ElMessage} from "element-plus";
import 'element-plus/theme-chalk/el-message.css'
import {useUserStore} from "@/stores/userStore.js";
import router from "@/router/index.js";
const http = axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout:5000 //时间
});

// 两个拦截器
// axios请求拦截器
// 一般会进行token身份验证等
http.interceptors.request.use(config => {
    const userStore = useUserStore()
    const token = userStore.userInfo.token;
    if (token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
// 一般进行错误的统一提示，token失效的处理等
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
export default http