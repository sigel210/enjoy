<template>
	<div class = 'fenkind'>
		<div v-for = 'item in citylist' class  = 'listitem'>
			<div class = 'tit'>
				{{item.name}}
			</div>
			<span @click="toprolist(i)" class = 'listitemcontent' v-for = 'i in item.sub_category_list'>
				{{i.name}}
			</span>
		</div>	
	</div>
	
</template>

<script>
	import MyAjax from './../md/MyAjax.js';
	export default{
		data(){
			return{
				cityeco : '',
				citylist : []
			}
		},
		methods:{
			toprolist(i){
				console.log(i);
				var prolistcan = i.enjoy_url.split('?')[1];
				console.log(prolistcan);
				this.$router.push({path : '/fenkindpro' , query : {prolist : prolistcan}});
			}
		},
		watch:{
			'$route':function(newRoute){
				var that = this;
				console.log(this.$route.params);
				console.log(localStorage.getItem('cityeco'));
				that.cityeco = that.$route.params.cityeco;  //从home页跳转时储存的城市地址    
				var url = 'https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9'+that.cityeco+'JmlzX25ld19sb2NhbD1mYWxzZSZtZDU9ZTA2OTllZjdiYTAwODhkMjc2M2Q0MjQ1MzRjOWY3OTgmMjAxNzA4MjIyMDAw.json'
				MyAjax.fetch(url,function(data){
					console.log(data);
					that.citylist = data;
				},function(err){
					console.log(err);
				})
			}
		},
		mounted(){
			var that = this;
				console.log(this.$route.params);
				console.log(localStorage.getItem('cityeco'));
				that.cityeco = localStorage.getItem('cityeco');  //从home页跳转时储存的城市地址    
				var url = 'https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9'+that.cityeco+'JmlzX25ld19sb2NhbD1mYWxzZSZtZDU9ZTA2OTllZjdiYTAwODhkMjc2M2Q0MjQ1MzRjOWY3OTgmMjAxNzA4MjIyMDAw.json'
				MyAjax.fetch(url,function(data){
					console.log(data);
					that.citylist = data;
				},function(err){
					console.log(err);
				})
			}
	}
</script>

<style scoped>
	.fenkind{
		height:100%;
		overflow: auto;
		background: whitesmoke;
	}
	.tit{
		margin:10px 20px;
	}
	.listitemcontent{
		display: inline-block;
		padding:15px 0;
		width:25%;
		border-right: 0;
		background: #fff;
		text-align: center;
	}
</style>