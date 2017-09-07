<template>
	<div class = 'jiesuancontainer'>
		<div @click="tohome()" class = 'back'>
			<b class = 'iconfont'>&#xe671;</b>
			Let us go home~~~~~
		</div>
		<ul>
			<li class = 'jiesuanlist' v-for = 'item in arr'>
				<div class = 'name'>
					<div class = 'proname'>
						{{item.pronname}}
					</div>
					<div class = 'num'>
						数量 x {{item.num}}
					</div>
					<div class = 'price'>
						价格：{{item.price}}
					</div>
				</div>
			</li>
		</ul>	
		<div class = 'kong'>
			
		</div>
		<div class = 'types'>
			<div class = 'heji'>
				合计：{{allprice}}元
			</div>
			<div class = 'type'>
				<div @click="show()" class = 'zhifubao'>
					支付
				</div>	
			</div>
		</div>
		<div @click="hide()" v-show = 'isshow' class = 'mengban'>
			<div class= 'zhifu'>
				<div class = 'zhifutit'>
					支付
				</div>
				<div class = 'count'>
					￥{{allprice}}
				</div>
				<div class = 'zhifutype'>
					<b class = 'iconfont zhifufont'>&#xe736;</b>
					<p class = 'pay'>支付宝支付</p>
				</div>	
			</div>
			
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				arr :[],
				allprice : 0,
				isshow : false
				
 			}
		},
		methods:{
			hide(){
				this.isshow = false;
			},
			show(){
				if(localStorage.getItem('address')){
					this.isshow = true;
				}else{
					this.$router.push('/address')
				}
			},
			tohome(){
				this.$router.push('/home');
			}
		},
		mounted(){
			console.log(localStorage.getItem('prolist0'));
			this.arr = JSON.parse(localStorage.getItem('prolist0'));
			console.log(this.arr);
			this.allprice = localStorage.getItem('allprice');
		}
	}
</script>
<style scoped>
	.mengban{
		position: fixed;
		top:0;
		left: 0;
		background: rgba(0,0,0,0.4);
		width: 100%;
		height:100%;
	}
	.back{
		background: #fff;
		padding:30px 15px 0 0;
		text-align: right;
	}
	.tohome{
		background: #fff;
		height:50px;
	}
	.jiesuancontainer{
		height: 100%;
		background: #EEEEEE;
		display: flex;
		flex-direction: column;
	}
	.jiesuanlist{
		padding:20px;
		display: flex;
		width:100%;
		box-sizing: border-box;
		background: #fff;
		margin-bottom:10px;
	}
	.name{
		width:100%;
		border-bottom: 1px solid #666;
	}
	.proname{
		width:80%;
	}
	.jiesuanlist .name div{
		margin:10px;
	}
	.kong{
		flex:1;
		background: #fff;
	}
	.quxiao{
		display: block;
		position: fixed;
		bottom:80px;
		width:18px;
	}
	.types{
		display: flex;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 50px;
		max-width : 640px;
	}
	.types div{
		flex: 1;
		text-align: center;
		line-height: 50px;
	}
	.types .heji{
		background: #fff;
	}
	.type{
		display: flex;
	}
	.wechat{
		background: orange;
		color: #fff;
	}
	.zhifubao{
		background: orangered;
		color: #fff;
	}
	.zhifu{
		background: #fff;
		width:300px;
		height:170px;
		position: absolute;
		left: 50%;
		top:50%;
		transform: translate(-50%,-50%);
		padding:10px;
	}
	.zhifutit{
		padding-top:10px;
		text-align: center;
	}
	.count{
		text-align: center;
		margin:15px 0;
		font-size: 42px;
		color:red;
	}
	.zhifufont{
		color:deepskyblue;
		font-size: 30px;
	}
	.zhifutype{
		padding:10px 0;
		margin:0 10px;
		border-top:1px solid #D3D3D3;
		border-bottom: 1px solid #D3D3D3;
		display: flex;
	}
	.pay{
		flex:1;
		padding-left:10px;
		line-height: 33px;
	}
</style>