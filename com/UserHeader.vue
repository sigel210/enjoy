<template>
	<div class = 'UserHeader'>
		<img src = '../img/userimg.png'  />
		<div class = 'userID'>
			{{userID}}
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				userID : ''
			}
		},
		mounted(){
			this.userID = localStorage.getItem('userID');
		}
	}
</script>

<style scoped>
	.UserHeader{
		display: flex;
		flex-direction: column;
		align-items: center;
		height:200px;
		width:100%;
		background: black;
	}
	img{
		width:20%;
		margin-top:15%;
	}
	.userID{
		color: #fff;
		margin-top:10px;
		font-weight: 900;
	}
</style>