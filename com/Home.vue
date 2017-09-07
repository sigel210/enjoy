<template>
	<div @scroll="menu($event)"  class = 'contentcontainer' >
		<div v-for = 'item in foodlist' class= 'contentbox'>
			<p class = 'contenttit'>{{item.group_section.title}}</p>
			<p class = 'time'>{{item.group_section.desc}}</p>
		 	<dt @click = 'todetail(i.enjoy_url)' v-for = 'i in item.tabs' class = 'food'>
		 		<img class = 'lazy' src="img/img.gif" alt="Photo" :data-echo="i.url">
		 		<p class="descibe">{{i.title}}</p>
		 		<p class = 'name'>{{i.desc}}</p>
			</dt>
		</div>
	</div>
</template>

<script>
	import MyAjax from './../md/MyAjax.js';
	import Vue from "vue";
	import VueRouter from "vue-router";
	Vue.use(VueRouter);
	var router=new VueRouter({
		
	})
	export default {
		data(){
			return{
				foodlist : [],
				scroll: '',
				num : 0
			}
		},
		methods:{
			todetail(data){
				var that = this;
				var arr = data.split('?')[1];
				console.log(arr);
				that.$router.push({path : '/detail' , query : {proid : arr}});
			},
			menu(ev){
				 Echo.init({
		                offset: 0,//离可视区域多少像素的图片可以被加载
		            　　 		throttle: 0 ,//图片延时多少毫秒加载
		                unload: false,
		            }); 
				var that = this;
//			    this.scroll =  document.body.scrollTop;
//			    console.log(this.scroll)
//			    console.log(document.body.scrollHeight)
			    var city_id = this.$route.params.cityid;
			    if(ev.target.scrollTop +  ev.target.offsetHeight ==  ev.target.scrollHeight){
			    	this.num++
			    	var url = 'https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id='+city_id+'&page='+this.num;
					MyAjax.vueJson(url,function(data){
						console.log(data);
						that.foodlist = data;
					},function(err){
						console.log(err);
					})
			    }
////			    console.log(this.num)
//					console.log(ev.target.scrollTop);
//					console.log(ev.target.offsetHeight);
//					console.log(ev.target.scrollHeight)
			   }
			
		},
		watch:{
			'$route':function(newRoute){
				var that = this;
				console.log(newRoute);
				var city_id = newRoute.params.cityid;
				localStorage.setItem('cityid',city_id);
				var url = 'https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id='+city_id+'&page=0'
				MyAjax.vueJson(url,function(data){
					that.foodlist = data;
					console.log(that.foodlist)
				},function(err){
					console.log(err);
				})
			}
		},
		mounted(){
			window.addEventListener('scroll', this.menu)
			var that = this;
			console.log(that.$route.params);
			var city_id = that.$route.params.cityid;
			if(city_id == 140){//设置默认主页
				localStorage.setItem('cityname','北京');
			};
			localStorage.setItem('cityid',city_id);
			var url = 'https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id='+city_id+'&page=0'
			MyAjax.vueJson(url,function(data){
				console.log(data);
				that.foodlist = data;
			},function(err){
				console.log(err);
			});
		},
		updated(){
			Echo.init({
			    offset: 0,
			    throttle: 0
			});
		}
	}
</script>

<style scoped>
	.contentcontainer{
		height: 100%;
		overflow-y: auto;
	}
	.contentbox{
		margin:20px 0;
		border-bottom: 1px solid #eee;
	}
	p{
		padding:0 20px;
		width:100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		box-sizing: border-box;
	}
	.contenttit{
		color:black;
		font-size:20px;
		font-weight: 900;
	}
	.time{
		font-size: 12px;
		color:red;
	}
	.lazy{
		width:100%;
		padding:20px;
		box-sizing: border-box;
	}
	.descibe{
		color:gray;
	}
	.name{
		font-size: 12px;
		color:lightgray;
	}
</style>