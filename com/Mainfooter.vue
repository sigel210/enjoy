<template>
	<ul class="footer">
		<li @click="color($event)">
			<router-link to='/home'>
				<b class='iconfont router-link-active'>&#xe60c;</b>
			</router-link>
		</li>
		<li @click="color($event)">
			<router-link to='/kind'><b class='iconfont'>&#xe652;</b></router-link>
		</li>
		<li @click="islogin(1,$event)" >
			<a><b class='iconfont'>&#xe601;</b></a>
		</li>
		<li  @click="islogin(2,$event)">
			<a><b class='iconfont'>&#xe6c9;</b></a>
		</li>
	</ul>
</template>
<script>
	export default {

		methods: {
			color(ev){
				$(ev.target).addClass('router-link-active').parents('li').siblings().find('b').removeClass('router-link-active')
			},
			islogin(num,ev) {
				var that = this;
				if(localStorage.getItem('isLogin')) {
					if(num == 1) {
						that.$router.push({
							path: '/invertion'
						})
					} else if(num == 2) {
						that.$router.push({
							path: '/user'
						})
					}
				} else {
					that.$router.push({
						path: '/login'
					});
				};
				$(ev.target).addClass('router-link-active').parents('li').siblings().find('b').removeClass('router-link-active')
			}
		},
		watch:{
			'$route':function(newRoute){
				if(newRoute.path.indexOf('home') != -1){
					$('.footer li:first-child b').addClass('router-link-active').parents('li').siblings().find('b').removeClass('router-link-active')
				}else if(newRoute.path.indexOf('kind') != -1){
					$('.footer li:nth-of-type(2) b').addClass('router-link-active').parents('li').siblings().find('b').removeClass('router-link-active')
				}else if(newRoute.path.indexOf('invertion') != -1){
					$('.footer li:nth-of-type(3) b').addClass('router-link-active').parents('li').siblings().find('b').removeClass('router-link-active')
				}else if(newRoute.path.indexOf('user') != -1){
					$('.footer li:nth-of-type(4) b').addClass('router-link-active').parents('li').siblings().find('b').removeClass('router-link-active')
				}
			}
		}
	}
</script>

<style scoped>
	.footer {
		height: 50px;
		width: 100%;
		background-color: #fff;
		display: flex;
	}
	.footer li{
		flex: 1;
		text-align:center;
		line-height: 50px;
	}
	.footer li a {
		font-size: 20px;
		color: gainsboro;
		text-decoration: none;
	}
	
	.router-link-exact-active.router-link-active {
		color: dimgray;
	}
	.router-link-active {
		color: dimgray;
	}
</style>