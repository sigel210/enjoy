import Vue from 'vue';
import Vuerouter from 'vue-router';
import App from './com/App.vue';
import router from "./router/router.js";
import VueResource from 'vue-resource';

Vue.use(Vuerouter); 
Vue.use(VueResource);

new Vue({
	el : '#app',
	router : router,//router 的挂载
	components: {
		'v-app' : App
	}
})
