<template>
	<div class = 'headercontainer'>
		<div v-show = 'isshow' @click="toFenkind()" class = 'titkind'>
			分类
		</div>
		<div v-show = 'isshow0' @click="tohome()" class = 'titkind'>
			首页
		</div>
		<div class= 'logo'>
			<img class = 'imglogo' src = '../img/logo.png'  />
			<div>
				<span @click="toshow()" class = 'atcity'>北京</span>
				<b @click="toshow()"  class = 'iconfont'>&#xe602;</b>
				<div class = 'city'>
					<p class = 'citytit'>本地服务开通城市</p>
					<span class = 'cityitem' v-for = 'item in list' @click = 'tocity(item)'>
						{{item.name}}
					</span>
				</div>
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
					<router-link :to = "{name : 'search' , params : {foodkey : searchword}}">
						<span @click = 'tosearch()' class = 'search'>搜索</span>
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
				list:[
				{name:'上海',id:104,eco:'MTA0'},
				{name:'北京',id:140,eco:'MTQw'},
				{name:'南京',id:144,eco:'MTQ0'},
				{name:'天津',id:185,eco:'MTg1'},
				{name:'广州',id:216,eco:'MjE2'},
				{name:'成都',id:235,eco:'MjM1'},
				{name:'杭州',id:260,eco:'MjYw'},
				{name:'深圳',id:299,eco:'Mjk5'},
				{name:'苏州',id:347,eco:'MzQ3'},
				{name:'西安',id:362,eco:'MzYy'},
				{name:'重庆',id:388,eco:'Mzg4'},
				{name:'长沙',id:401,eco:'NDAx'}
				],
				searchword  : '',
				isshow : true,
				isshow0 : false
			}
		},
		methods:{
			toFenkind(){
				var that = this;
				that.isshow0 = true;
				that.isshow = false;
				this.$router.push('/fenkind');
			},
			tohome(){
				var that = this;
				that.isshow0 =false ;
				that.isshow = true;
				this.$router.push('/home');
			},
			tosearchshow(){
				$('.iptbox').toggle();
			},
			toshow(){
				$('.city').toggle();
				
			},
			tocity(item){
				var that = this;
				$('.atcity').html(item.name);
				localStorage.setItem('cityname',item.name)
				localStorage.setItem('cityeco',item.eco);
				$('.city').hide();
				console.log(that.$route.path.indexOf('/home'));
				if(that.$route.path.indexOf('/home') == 0){
					that.$router.push({name:"home" , params : {cityid : item.id}});
				}else if(that.$route.path.indexOf('/fenkind') != -1){
					that.$router.push({name:'fenkind' , params : {cityeco : item.eco}});
				}
			},
			tosearch(){
				var that = this;
				if($('.ipt').val()!==''){
					that.searchword = $('.ipt').val();
				}
			}
		},
		mounted(){
			var that = this;
			$('.atcity').html(localStorage.getItem('cityname'));
			console.log(that.$route.path.indexOf('/home'));
			if(that.$route.path.indexOf('/home') != -1){
				that.isshow0 = false;
				that.isshow = true;
			}else if(that.$route.path.indexOf('/fenkind') != -1){
				that.isshow0 =true ;
				that.isshow = false;
			}
		}
	}
</script>

<style scoped>
	 .headercontainer{
	 	height: 50px;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
	 	display: flex;
	 	align-items: center;
	 	justify-content: space-between;
	 	padding:0 20px;
	 	background: black;
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