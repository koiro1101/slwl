import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/styles/reset.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/golab.css'
// import echarts from 'echarts'
// Vue.use(echarts)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
