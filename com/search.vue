<template>
	<div @scroll="menu($event)" class = 'searchcontainer'>
		<div  class = 'top'>
			<div @click = 'isshow'  class = 'left tit'>
				本地服务
			</div>
			<div @click = 'isshow' class = 'right tit'>
				全国送
			</div>
		</div>
		<p class = 'middle'>
			根据您的关键词为您提供以下商品
		</p>
		<div>
			<div  class = 'prolist'>
				<div @click = 'todetail(item.enjoy_url)' v-for = 'item in prolist' class="probox">
					<img class = 'img' src="img/img.gif" alt="Photo" :data-echo="item.product_image" />
					<div class = 'prolistdesc'>
						<div class = 'name'>{{item.short_name}}</div>
						<div class = 'price'>
							<div class = 'xianprice'>{{item.price/100}}元/{{item.show_entity_name}}</div>
							<div v-if='show' class = 'yuanprice'>￥{{item.original_price/100}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class = 'prolist hide'>
				<div @click = 'todetail(item.enjoy_url)'  v-for = 'item in prolist0' class="probox hide">
					<img class = 'img' src="img/img.gif" alt="Photo" :data-echo="item.product_image" />
					<div class = 'prolistdesc'>
						<div class = 'name'>{{item.short_name}}</div>
						<div class = 'price'>
							<div class = 'xianprice'>{{item.price/100}}元/{{item.show_entity_name}}</div>
							<div class = 'yuanprice'>￥{{item.original_price/100}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>	
</template>

<script>
	import MyAjax from './../md/MyAjax.js';
	export default{
		data(){
			return{
				prolist : [],
				prolist0 : [],
				show : true
			}
		},
		methods:{
			isshow(){
				$('.tit').on('tap',function(){
					$(this).css('border-bottom','3px solid black').siblings().css('border',0);
					var index = $(this).index();
					$('.prolist').eq(index).removeClass('hide').siblings().addClass('hide');
				})
			},
			todetail(data){
				var that = this;
				var arr = data.split('?')[1];
				console.log(arr);
				that.$router.push({path : '/detail' , query : {proid : arr}});
			},
			menu(ev) {
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
						that.foodlist = data;
					},function(err){
						console.log(err);
					})
			    }
////			    console.log(this.num)
					console.log(ev.target.scrollTop);
					console.log(ev.target.offsetHeight);
					console.log(ev.target.scrollHeight)
			   }
		},
		watch:{
			'$route':function(newRoute){
				var that = this;
				console.log(newRoute);
				var foodkey = this.$route.params.foodkey;
				var city_id = localStorage.getItem('cityid');
				console.log(city_id);
				var url = 'https://api.ricebook.com/3/enjoy_product/search.json?city_id='+city_id+'&keyword='+foodkey+'&page=0'
				MyAjax.vueJson(url,function(data){
					console.log(data);
					that.prolist = data.products;
					console.log(that.prolist)
				},function(err){
					console.log(err);
				})
			},
		},
		mounted(){
			var that = this;
			console.log(this.$route);
			var foodkey = this.$route.params.foodkey;
			var city_id = localStorage.getItem('cityid');
			console.log(city_id);
			var url = 'https://api.ricebook.com/3/enjoy_product/search.json?city_id='+city_id+'&keyword='+foodkey+'&page=0'
			MyAjax.vueJson(url,function(data){
				console.log(data);
				that.prolist = data.products;
				console.log(that.prolist)
			},function(err){
				console.log(err);
			})
			var url = 'https://api.ricebook.com/3/enjoy_product/search.json?city_id=1&keyword='+foodkey+'&page=0';
			MyAjax.vueJson(url,function(data){
				console.log(data);
				that.prolist0 = data.products;
				console.log(that.prolist0)
			},function(err){
				console.log(err);
			})
		},
		updated(){
			Echo.init({
	                offset: 0,//离可视区域多少像素的图片可以被加载
	            　　 		throttle: 0 ,//图片延时多少毫秒加载
	                unload: false,
	            });
		}
	}
</script>

<style scoped>
	.searchcontainer{
		height:100%;
		overflow-y: auto;
	}
	.top{
		display: flex;
		height: 45px;
	}
	.top div{
		height:100%;
		flex:1;
		text-align: center;
		line-height: 45px;
		border-bottom: 1px solid #eee;
	}
	.top .left{
		border-bottom: 3px solid black;
	}
	.hide{
		display: none;
	}
	.probox{
		display: flex;
		padding:10px 0;
		margin:0 20px;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
	}
	.middle{
		margin:20px 20px 10px;
		text-align: center;
		font-size: 12px;
		color:#666;
	}
	.img{
		width:50%;
		height:100px;
	}
	.prolistdesc{
		margin-left:10px;
	}
	.prolistdesc div{
		margin:5px;
		font-size: 14px;
	}
	.price{
		display: flex;
	}
	.xianprice{
		color: red;
	}
	.yuanprice{
		color:darkgray;
		text-decoration: line-through;
	}
</style>