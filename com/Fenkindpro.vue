<template>
	<div @scroll="menu($event)" class = 'kindlistbox'>
		<div class = 'sortcontainer'>
			<div class = 'all'>全部商品</div>
			<div @click="toshow()" class = 'sortshow'>智能排序</div>
		</div>
		<div class = 'sortbox'>
			<div @click="addclass($event,item)" v-for = 'item in sort' class = 'sort'>
				{{item.sort_name}}
			</div>
		</div>
		<ul class = 'kindlist'>
			<li @click="todetail(item)" class = 'kindlistpro' v-for = 'item in kindlist'>
				<img class = 'product_image' src="img/img.gif" alt="Photo" :data-echo="item.product_image" />
				<div class = 'kindpromsg'>
					<p class = 'kindprotit'>
						{{item.name}}
					</p>
					<div class = 'price'>
						<p class = 'nowprice'>
							{{item.price/100}}元/{{item.show_entity_name}}
						</p>	
						<p class = 'orginprice'>
							￥{{item.original_price/100}}
						</p>
					</div>
					
					<div v-if = 'item.area ? true : false' class = 'area'>
						<b class = 'iconfont'>&#xe604;</b>
						<p class = 'areaname'>{{item.area}}</p>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import MyAjax from './../md/MyAjax.js';
	export default{
		data(){
			return{
				kindid : ''	,
				kindlist : [],
				isok : true,
				sort : ''
			}
		},
		methods:{
			todetail(data){
				var that = this;
				var data = data.enjoy_url;
				var arr = data.split('?')[1];
				console.log(arr);
				that.$router.push({path : '/detail' , query : {proid : arr}});
			},
			toshow(){
				$('.sortbox').toggle();
			},
			addclass(event,item){
				var that = this;
				console.log(event.target);
				$(event.target).addClass('bg').siblings().removeClass('bg');
				var url = 'https://api.ricebook.com/4/tab/category_product_list.json?'+this.kindid+"&sort="+item.sort_id;
				MyAjax.fetch(url,function(data){
					console.log(data);
					that.kindlist = data;
					console.log(that.kindlist);
				},function(err){
					console.log(err);
				});
				var name = item.sort_name;
				console.log(name);
				$('.sortshow').html(name);
				$('.sortbox').toggle();
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
//					console.log(ev.target.scrollTop);
//					console.log(ev.target.offsetHeight);
//					console.log(ev.target.scrollHeight)
			   }
		},
		mounted(){ 
			var that = this;
			this.kindid = this.$route.query.prolist;
			console.log(this.kindid);
			
			var url = 'https://api.ricebook.com/4/tab/category_product_list.json?'+this.kindid;
			MyAjax.fetch(url,function(data){
				console.log(data);
				that.kindlist = data;
				console.log(that.kindlist);
			},function(err){
				console.log(err);
			});
			var url0 = 'https://api.ricebook.com/4/tab/sub_category.json?'+this.kindid;
			MyAjax.fetch(url0,function(data){
				console.log(data);
				that.sort = data.sort;
			},function(err){
				console.log(err);
			});
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
	.kindlistbox{
		height:100%;
		width: 100%;
		overflow-y: auto;
	}
	.bg{
		background: #F5F5F5;
		color:red;
	}
	.sortcontainer{
		width: 100%;
		display: flex;
	}
	.sortbox{
		display: none;
		position:absolute;
		text-align: center;
		width:100%;
		background: #fff;
	}
	.sortbox>div{
		padding:10px 0;
		border-bottom: 1px solid #666;
	}
	.sort{
		font-size: 12px;
	}
	.sortcontainer>div{
		flex:1;
		border:1px solid black;
		text-align: center;
		padding:10px 0;
	}
	.sortcontainer>div:last-child{
		border-left: 0;
	}
	.kindlistpro{
		overflow: hidden;
		padding:15px;
		display: flex;
		border-bottom: 1px solid #D3D3D3;
	}
	.product_image{
		width:45%;
		margin-right:15px;
		float:left;
		height:100px;
	}
	.kindpromsg{
		float:left;
		width:50%;
	}
	.kindprotit{
		height:60px;
	}
	.price{
		margin-bottom: 10px;
		color:red;
		display: flex;
	}
	.nowprice{
		margin-right:10px;
	}
	.orginprice{
		text-decoration: line-through;
		color:#D3D3D3;
	}
	.area{
		display: flex;
		color:#808080;
		font-size: 12px;
	}
</style>