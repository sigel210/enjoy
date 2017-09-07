<template>
	<div class = 'container'>
		<header class = 'header'>
			<router-view name = 'header'></router-view>
		</header>
		<div id = 'content'>
			<router-view></router-view>
		</div>
		<footer v-show = 'isshow' id = 'footer'>
			<router-view name = 'footer'></router-view>
		</footer>
	</div>
</template>
<script>
	import './../scss/main.scss';
	import Vue from 'vue';
	import Mint from 'mint-ui';
	import 'mint-ui/lib/style.css';
	Vue.use(Mint);
	export default{
		data(){
			return{
				isshow : true
			}
		},
		mounted(){
			
		},
		updated(){
			Echo.init({
			    offset: 0,
			    throttle: 0
			});
		},
		watch:{
			
		},
		
	}
</script>

<style>
</style>