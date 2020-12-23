import Vue from 'vue'
import App from './App'
import base from './static/css/base.css'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
