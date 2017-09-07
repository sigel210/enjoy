<template>
	<div class = 'headercontainer'>
		<div class = 'titkind'>
			<router-link to = '/'>首页</router-link> 
		</div>
		<div class= 'logo'>
			<img class = 'imglogo' src = '../img/logo.png'  />
			<div>
				<span class = 'atcity'></span>
			</div>
		</div>
		<div class = 'titbox'>
			<div class = 'tititem'>
				<b class = 'iconfont'>&#xe600;</b>
			</div>
			<div class = 'tititem'>
				<b @click = 'tosearchshow()'  class = 'iconfont'>&#xe6b9;</b>
				<div class = 'iptbox'>
					<input class = 'ipt' type = 'text' placeholder = '搜索本地精选/快递到家' />
					<router-link :to = "{name : 'detail' , params : {foodkey : searchword}}">
						<span @click = 'todetail()' class = 'search'>搜索</span>
					</router-link>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				searchword  : ''
			}
		},
		methods:{
			tosearchshow(){
				$('.iptbox').toggle();
			},
			todetail(){
				var that = this;
				if($('.ipt').val()!==''){
					that.searchword = $('.ipt').val();
				}
			}
		},
		mounted(){
			$('.atcity').html(localStorage.getItem('cityname'));
		}
	}
</script>

<style scoped>
	a{
		color:#fff;
	}
	 .headercontainer{
	 	height: 50px;
	 	width:100%;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        text-shadow: 1px 1px 1px #000;
	 	display: flex;
	 	align-items: center;
	 	justify-content: space-between;
	 	padding:0 20px;
	 	background: black;
	 	box-sizing: border-box;
	 }
	 .titkind{
	 	width:72px;
	 }
	 .logo{
	 	display: flex;
	 	align-items: center;
	 	justify-content: center;
	 	font-size: 12px;
	 }
	 .imglogo{
	 	height:30px;
	 }
	 ..atcity{
	 	color:#fff;
	 }
	 .titbox{
	 	display: flex;
	 }
	 .tititem{
	 	padding:0 10px;
	 	box-sizing: border-box;
	 }
	 .city{
	 	position:absolute;
	 	top:50px;
	 	left:0;
	 	height: 100%;
	 	width:100%;
	 	background: #fff;
	 	font-weight: 100;
	 	display: none;
	 }
	 .city p {
	 	margin:30px 10px 10px;
	 	font-size: 20px;
	 	color:#000;
	 }
	 .city span{
	 	float: left;
	 	width:30%;
	 	flex-wrap: wrap;
	 	padding: 5px 0px;
	 	margin:10px 5px;
	 	font-size: 16px;
	 	text-align: center;
	 	border:1px solid #000;
	 	color:dimgray;
	 }
	 .iptbox{
	 	width:100%;
	 	height:50px;
	 	padding:10px 20px;
	 	box-sizing: border-box;
	 	position: absolute;
	 	background: #fff;
	 	left:0;
	 	top:50px;
	 	display: flex;
	 	display: none;
	 }
	 .search{
	 	color:black;
	 	flex:1;
	 	margin-left:10px;
	 	font-weight: 100;
	 }
	 .ipt{
	 	border:0;
	 	background: #eee;
	 	flex:3;
	 	height:100%;
	 	padding:10px 20px;
	 	box-sizing: border-box;
	 	outline: none;
	 }
	 
</style>