<template>
	<div class = 'kindcontainer'>
		<div class = 'titbox'>
			<div class = 'tit'>
			{{firstlisttit}}
			</div>
			<div class = 'firstdesc'>
				{{firstlistdesc}}
			</div>
		</div>
		<div class="swiper-container firstswiper">
		    <div class="swiper-wrapper firstswiper-wrapper">
		        <div style = 'width:90%' v-for = 'item in firstlist.tabs' class="swiper-slide firstswiper-slide">
		        	<img class = 'firstlistimg' :src = 'item.url' />
		        	<div class = 'swipertags'>
		        		{{item.tag}}
		        	</div>
		        	<div class  = 'swipertitle'>
		        		{{item.title}}
		        	</div>
		        	<div class = 'swiperdesc'>
		        		{{item.desc}}
		        	</div>
		        </div>
		    </div>
		</div>
		<div class="swiper-container secondswiper">
		    <div class="swiper-wrapper secondswiper-wrapper">
		        <div class="swiper-slide">
		        	<img class = 'secondlisttimg' src = './../img/japanfood.png' />
		        	<div class = 'word'>
		        		<p class = 'secondlisttit'>
		        			{{secondlist0.title}}
		        		</p>
		        		<p>
		        			{{secondlist0.desc}}
		        		</p>
		        	</div>
		        </div>
		        <div class="swiper-slide">
		        	<img class = 'secondlisttimg' src = './../img/food2.png' />
		        	<div class = 'word'>
		        		<p class = 'secondlisttit'>
		        			{{secondlist1.title}}
		        		</p>
		        		<p>
		        			{{secondlist1.desc}}
		        		</p>
		        	</div>
		        </div>
		        <div class="swiper-slide">
		        	<img class = 'secondlisttimg' src = './../img/food3.png' />
		        	<div  class = 'word'>
		        		<p class = 'secondlisttit'>
		        			{{secondlist2.title}}
		        		</p>
		        	</div>
		        </div>
		    </div>
		</div>
		<div v-for = 'item in kindlist' class = 'kindlist'>
			<div  class = 'kindlisttop'>
				<p class = 'kindlisttit'>
					{{item.data.group_section.title}}
				</p>
				<p class = 'kinddesc'>
					{{item.data.group_section.desc}}
				</p>	
			</div>
			<div class = 'findmore'>
				查看更多
			</div>
			<div class = 'kindlistpro'>
				<img class = 'kindimg' v-for = 'i in item.data.tabs' :src = 'i.url' @click="todetail(i)"/>
			</div>
		</div>
	</div>
</template>

<script>
	import MyAjax from './../md/MyAjax.js';
	export default {
		data(){
			return{
				firstlist : [],
				firstlisttit : [],
				firstlistdesc : [],
				secondlist :[],
				secondlist0 : [],
				secondlist1 :　[],
				secondlist2 : [],
				kindlist : []
			}
		},
		methods:{
			todetail(i){
				console.log(i);
				var that = this;
				var i = i.enjoy_url;
				var arr = i.split('?')[1];
				console.log(arr);
				that.$router.push({path : '/detail' , query : {proid : arr}});
			}
		},
		computed:{
			
		},
		mounted(){
			var that = this;
			console.log(localStorage.getItem('cityid'))
			var cityid = localStorage.getItem('cityid');
			var url = 'https://api.ricebook.com/hub/home/v1/web/explore.json?city_id='+cityid;
				MyAjax.vueJson(url,function(data){
					console.log(data);
					that.firstlist = data[0].data;
					that.firstlisttit = data[0].data.group_section.title; 
					that.firstlistdesc = data[0].data.group_section.desc;
					console.log(that.firstlist);	
					that.secondlist = data[1].data;
					that.secondlist0 = data[1].data.tabs[0];
					console.log(that.secondlist0);
					that.secondlist1 = data[1].data.tabs[1];
					that.secondlist2 = data[1].data.tabs[2];
					console.log(that.secondlist);
					for(var i in data){
						if(i>1){
							that.kindlist.push(data[i]);
						}
					}
					console.log(that.kindlist);
				})
		},
		updated(){
			var mySwiper = new Swiper ('.firstswiper', {
			        slidesPerView: 'auto',
			        centeredSlides: true,
			        paginationClickable: true,
			        spaceBetween: 10
			});
			var mySwiper = new Swiper ('.secondswiper', {
		        slidesPerView: 'auto',
		        paginationClickable: true,
		        spaceBetween: 10
			}) 
		}
	}
</script>

<style scoped>
	.kindcontainer{
		overflow-y: auto;
	}
	.kindcontainer>div{
		border-bottom: 1px solid darkgray;
	}
	.kindcontainer>div:first-child{
		border: 0;
	}
	.swiper-container{
		margin:0 20px;
	}
	.titbox{
		margin:30px 20px;
	}
	.tit{
		font-size: 20px;
		font-weight: 900;
	}
	.firstdesc{
		font-size: 12px;
		color:#666;
	}
	.firstlistimg{
		width:100%;
	}
	.secondswiper{
		padding:20px 0;
	}
	.secondlisttimg{
		width:100%;
	}
	.swiper-slide{
		width:40%;
		position: relative;
	}
	.swiper-slide:last-child{
		margin-right:20px;
	}
	.swipertags{
		font-size: 12px;
		color:red;
	}
	.swipertitle{
		font-weight: 900;
	}
	.swiperdesc{
		font-size: 12px;
		color:#666;
		margin-bottom:20px;
	}
	.word{
		position: absolute;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
		color:#fff;
		font-size: 10px;
		text-align: center;
	}
	.secondlisttit{
		font-size: 16px;
		font-weight: 900;
	}
	.kindlist{
		margin:20px 30px;
		position: relative;
	}
	.kindlisttit{
		font-size: 20px;
		font-weight: 900;
	}
	.kinddesc{
		font-size: 12px;
		color:red;
	}
	.findmore{
		color:red;
		position:absolute;
		top:10px;
		right:0;
		font-size: 12px;
	}
	.kindlistpro{
		display: flex;
		margin:20px 0;
	}
	.kindimg{
		width:30%;
		height:100%;
	}
</style>