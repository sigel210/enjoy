<template>
	<div class = 'detailcontainer'>
		<div class="swiper-container">
		    <div class="swiper-wrapper">
				<div v-for = 'item in prodetail' class="swiper-slide">
					<img class = 'prodetailimg' :src = 'item.img_url' />
				</div>
		    </div>
		    <div class="swiper-pagination"></div>
		</div>
		<div class = 'prodetailmsg'>
			<div class = 'protit'>
				<p>
					{{proderailmsg.short_name}}-{{proderailmsg.spec}}
				</p>
				<span class = 'iconfont'>&#xe60b;</span>
			</div>
			<p class = 'proname'>
				{{proderailmsg.description}}
			</p>
			<div class = 'price'>
				<div class = 'nowprice'>{{proderailmsg.price/100}}/{{proderailmsg.show_entity_name}}</div>
				<div class = 'orginprice'>￥{{proderailmsg.origin_price/100}}</div>
			</div>
		</div>
		<div v-for = 'item in shopmsg' class = 'shopmsg' >
			<p class = 'shop'>
				商户信息
			</p>
			<div class = 'shopname'>
				{{item.restaurant_name}}
			</div>
			<div class = 'address'>
				{{item.restaurant_address}}
			</div>
			<div class = 'phone'>
				{{item.restaurant_phone_numbers[0]}}
			</div>
		</div>
		<div class  = 'menu'>
			<div class = 'menutit'>
				MENU
			</div>
			<div  v-for = 'item in menumsg'  class = 'menusubcontent'>
				<div class = 'menusubtit'>
					-{{item.sub_title}}-
				</div>
				<div v-for = 'i in item.text' class = 'menucontent'>
					{{i}}
				</div>
			</div>
		</div>
		<div class = 'prolightlist'>
			<div class = 'prolightlisttit'>
				亮点
			</div>
			<div v-for = 'item in lightmsg' class = 'prolight'>
				<img class = 'prolightimg' :src = 'item.img_url' />
				<div class = 'lighttit'>
					{{item.title}}
				</div>
				<div class = 'lightcontent'>
					{{item.content}}
				</div>
			</div>
		</div>
		<ul  class = 'usetipsbox'>
			<div class = 'usetips'>
				使用提示
			</div>
			<li v-for = 'item in usetips' class = 'usetipscontent'>
				{{item.text}}
			</li>
			<a @click="toshow()" class= 'moretips'>
				更多补充说明
				<b class = 'iconfont'>&#xe624;</b>
			</a>
		</ul>
		<div class = 'morelikebox'>
			<div class = 'moreliketit'>
				猜你喜欢
			</div>
			<div @click = 'todetail(item)'  v-for = "item in moreshop" class = 'moreshop'>
				<img class = 'moreimg' :src = 'item.product_image_url' />
				<div class = 'moreshopcontent'>
					<div class = 'moreshopname'>
						{{item.product_name}}
					</div>
					<div class = 'price'>
						{{item.price/100}}元/{{item.show_entity_name}}
					</div>
				</div>
			</div>
		</div>
		<div class = 'detilfooter'>
			<b @click="tocart()" class = 'iconfont'>&#xe617;</b><span class = 'pronum'></span>
			<div @click="tosavecart()" class = 'tocart duang'>
				加入购物车
			</div>
			<div class = 'tobuy duang'>
				立即购买
			</div>
		</div>
		<div class = 'kong'>
			
		</div>
	</div>
</template>
<script>
	import MyAjax from './../md/MyAjax.js';
	export default {
		data(){
			return{
				prodetail : [],
				proderailmsg : [],
				msg : [],
				shopmsg : [],
				menumsg : [],
				lightmsg : [],
				usetips : [],
				moreshop : [],
				arr : [],
				flag : false,
				isshow : true
			}
		},
		methods:{
			toshow(){
				$('.usetipscontent').show();
				$('.moretips').hide();
			},
			todetail(data){
				var that = this;
				var data = data.enjoy_url;
				var arr = data.split('?')[1];
				console.log(arr);
				that.$router.push({path : '/detail' , query : {proid : arr}});
				window.location.reload();
			},
			tosavecart(){
				var that = this;
				if(localStorage.getItem('isLogin')){
					if(localStorage.getItem('prolist')){
						//若购物车里存在商品
							that.arr = JSON.parse(localStorage.getItem('prolist'));
							console.log(localStorage.getItem('prolist'))
						};
						var num = 1;
						var src = $('.prodetailimg')[0].currentSrc;
						console.log(src);
						var name = $('.protit')[0].innerText;
						var price =Number($('.nowprice')[0].innerText.split('/')[0]);
						var obj = {
							imgsrc : src,
							pronname : name,
							price : price,
							num : num
						}
						console.log(that.arr);
						var arr = that.arr;
						console.log(arr);
						var objstr = JSON.stringify(obj).split('num')[0];
						console.log(obj);
						console.log(objstr);
						for(var i in arr){
							var arrstr = JSON.stringify(arr[i]).split('num')[0];
							//判断为同一件商品
							if(objstr == arrstr){
								arr[i].num++;
								that.flag = true;
								$('.pronum').show();
								$('.pronum').html(arr[i].num);
								break;
							}
						}
						if(that.flag == false){
							//不是同一件商品
							$('.pronum').show();
							$('.pronum').html(1);
							arr.push(obj);
						}
						
						localStorage.setItem('prolist',JSON.stringify(arr));
						console.log(arr);
				}else{
					this.$router.push('/login');
				}
				
			
			},
			tocart(){
				this.$router.push('/cart');
			}
		},
		mounted(){
			var that = this;
			console.log(this.$route);
			var proid = this.$route.query.proid;
			console.log(proid);
			const url = 'https://api.ricebook.com/product/info/product_detail.json?product_'+ proid;
			MyAjax.vueJson(url,function(data){
				console.log(data);
				that.prodetail = data.basic.product_images;
				that.proderailmsg = data.basic;
				that.msg = data.modules;
				console.log(that.msg);
				that.shopmsg = data.modules[0].data.restaurants;
				console.log(data.modules);
				that.menumsg = data.modules[1].data.contents;
				that.lightmsg = data.modules[2].data.lights;
				that.usetips = data.modules[3].data.contents;
				if(data.modules[4]){
					that.moreshop = data.modules[4].data.recommend;
				}
				console.log(that.moreshop);
			},function(err){
				console.log(err);
			});
			$('.pronum').hide();
		},
		updated(){
			var mySwiper = new Swiper ('.swiper-container', {
    			loop: true,
				pagination: '.swiper-pagination',
				autoplay:2000
			});
			for(var i in $('.usetipscontent')){
				if(i>=2){
					$('.usetipscontent').eq(i).hide()
				}
			}
		}
	}
	
</script>

<style scoped>
	.loadimg{
		position: fixed;
		height:100%;
		width:100%;
		top:0;
		left:0;
		z-index: 900;
	}
	.detailcontainer{
		background: lightgray;
	}
	.prodetailimg{
		width:100%;
	}
	.prodetailmsg{
		padding:20px;
		background: #fff;
	}
	.protit{
		display: flex;
		font-size:20px;
		color:dimgray;
	}
	.proname{
		font-size:20px;
		color:darkgray;
		margin:15px 0;
	}
	.price{
		display: flex;
	}
	.nowprice{
		color:red;
		font-size: 20px;
	}
	.orginprice{
		font-size: 20px;
		text-decoration: line-through;
		color:#666;
		margin-left: 20px;
	}
	.shopmsg{
		margin:10px 0;
		padding:20px;
		background: #fff;
	}
	.shopmsg div{
		border-bottom: 1px solid #eee;
	}
	.shop{
		height:50px;
		text-align: center;
		line-height: 50px;
		font-size: 20px;
		color:dimgray;
		font-weight: 900;
	}
	.shopname{
		padding:20px 10px;
		font-size: 20px;
	}
	.address{
		width:100%;
		padding:20px 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size:16px;
	}
	.phone{
		width:100%;
		padding:20px 0;
		font-size:16px;
	}
	.menu{
		background: #fff;
		width:100%;
	}
	
	.menu div{
		text-align: center;
		
	}
	.menu .menusubcontent{
		margin:20px;
		color:#666;
	}
	.menusubcontent .menusubtit{
		font-size: 20px;
		margin:5px;
		color:gray;
	}
	.menusubcontent .menucontent{
		font-size: 20px;
		margin:5px;
		color:darkgray;
	}
	.menutit{
		padding:20px 0;
		font-size: 20px;
		font-weight: 900;
	}
	.prolightlist{
		background: #fff;
		padding:0 20px;
		margin-bottom: 10px;
	}
	.prolightlisttit{
		text-align: center;
		padding:20px;
		font-size: 20px;
		font-weight: 900;
	}
	.prolightimg{
		width:100%;
		margin:20px 0
	}
	.lighttit{
		text-align: center;
		padding:20px 0;
		font-size: 20px;
		font-weight: 900;
		color:#666;
	}
	.lightcontent{
		font-size: 20px;
		color:darkgray;
		line-height:25px;
		margin:5px;
	}
	.usetipsbox{
		background:#fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.usetips{
		text-align: center;
		padding:20px 0;
		font-size: 20px;
		font-weight: 900;
		color:#666;
	}
	.usetipscontent{
		font-size: 20px;
		color:darkgray;
		line-height:25px;
		list-style:disc;
		margin:5px;
		box-sizing: border-box;
		padding:0 20px ;
		list-style-position: inside;
	}
	.morelikebox{
		background: #fff;
	}
	.moreliketit{
		text-align: center;
		padding:20px 0;
		font-size: 20px;
		font-weight: 900;
		color:#666;
	}
	.moreshop{
		display: flex;
		padding:20px;
	}
	.moretips{
		display: inline-block;
		font-size: 20px;
		padding:10px 20px;
		color:gray;
		margin:0 auto;
	}
	.moreimg{
		width:50%;
		height:100px;
	}
	.moreshopcontent{
		padding:10px;
		font-size: 12px;
	}
	.price{
		margin-top:30px;
		color:red;
	}
	.detilfooter{
		width:100%;
		height:50px;
		display: flex;
		position: fixed;
		bottom:0;
		max-width:640px;
	}
	.iconfont{
		flex:1;
		display: block;
		text-align: center;
		line-height: 50px;
		background: #fff;
	}
	.duang{
		flex:2;
		height:100%;
		text-align: center;
		line-height: 50px;
		background: orange;
		color:white;
		font-size: 20px;
	}
	.tobuy{
		background: orangered;
	}
	.pronum{
		background: red;
		width:20px;
		height:20px;
		position: absolute;
		text-align: center;
		left: 40px;
		color:#fff;
		border-radius: 50%;
	}
	.kong{
		height:50px;
	}
</style>