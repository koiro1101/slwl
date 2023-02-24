import axios from "axios";
import store from "../store/index";
import router from "../router/index";
import { Message } from "element-ui";

// 创建一个新的axios实例
const request = axios.create({
  // baseURL: " https://slwl-geteway.itheima.net/manager/",
  baseURL: " https://slwl-geteway-t.itheima.net/manager/",
  // baseURL: " http://weldon.net.cn:8889/api/private/v1/",
 
  // http://weldon.net.cn:8889/api/private/v1/
  timeout: 10000,
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么

   const token = store.state.user.token;
    // console.log(token);
    if (token) {
      config.headers.Authorization = token
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么

    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    if (error.response.status === 401) {
      Message.error('token过期')
      store.dispatch('user/delToken')
  
      router.push('/login')
    } else {
      Message.error(error.message)
    }
   
    return Promise.reject(error);
  }
);

export default request;

