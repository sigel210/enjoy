<template>
	<ul class = 'usercontent'>
		<li>
			<p>Code 消费码</p>
			<b class = 'iconfont'>
				&#xe649;
			</b>
		</li>
		<li>
			<p>我的消费券</p>
			<b class = 'iconfont'>
				&#xe649;
			</b>
		</li>
		<li>
			<p @click="toaddress">地址管理</p>
			<b class = 'iconfont'>
				&#xe649;
			</b>
		</li>
		<button @click="tui()" class = 'btn'>退出登录</button>
	</ul>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			tui(){
				localStorage.removeItem('isLogin');
				
				this.$router.push('/home');
			},
			toaddress(){
				this.$router.push('/address');
			}
		}
	}
</script>

<style scoped>
	.usercontent{
		height: 100%;
		background:#EEEEEE;
		overflow: hidden;
	}
	.usercontent li{
		height:50px;
		background: #fff;
		display: flex;
		align-items: center;
	}
	.usercontent li p{
		margin:0 20px;
		height:100%;
		width: 100%;
		line-height: 50px;
		border-bottom: 1px solid #eee;
	}
	.usercontent li b{
		width:50px;
	}
	.usercontent li:first-child{
		margin:10px 0;
		font-weight: 900;
	}
	.btn{
		position: absolute;
		left:50%;
		transform: translateX(-50%);
		margin-top:100px;
		width:200px;
		height:50px;
		background: red;
		color: #fff;
		border: 0;
	}
</style>