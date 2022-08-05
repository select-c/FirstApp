import App from './App.vue'

// #ifndef VUE3
import Vue from 'vue'
import service from './pages/service/service.js';
import utils from './pages/service/utils.js';

Vue.prototype.$utils=utils;
Vue.prototype.$service=service;
Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
	...App	
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
