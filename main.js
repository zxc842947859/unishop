import Vue from 'vue'
import App from './App'
import Request from './utils/request.js'

// 将封装好的请求函数函数挂载到Vue上
Vue.prototype.$request = Request
// 创建eventbus
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
