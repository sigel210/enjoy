<template>
	<div class = 'cartcontainer'>
		<div @click="tohome()" class = 'back'>
			<b class = 'iconfont'>&#xe671;</b>
			Let us go home~~~~~
		</div>
		<div v-show = 'isshow' class = 'cartnopro'>
			<img class = 'cartnoproimg' src = '../img/carnopro.png'  />
		</div>
		<ul class = 'cartlist'>
			<li v-for = '(item,index) in arr' class = 'cartpro'>
				<b @click="point($event,index)" class = 'iconfont hide checked part'>&#xe603;</b>
				<img class = 'cartproimg' :src = 'item.imgsrc'  />
				<div class = 'pro'>
					<p class = 'proname' >{{item.pronname}}</p>
					<p class = 'proprice'>单价：{{item.price}}元</p>
					<div class = 'countbox'>
						<button class = 'jian btn ' @click="reduce($event,index)">
							-
						</button>
						<span class = 'pronum' >{{item.num}}</span>
						<button class = 'jia btn' @click="add($event,index)">
							+
						</button>
						<b @click="Delete(index)" class = 'delete iconfont'>&#xe656;</b>
					</div>
				</div>
			</li>
		</ul>
		<!--<div class = 'tohomebox'>
			导航
			<ul class = 'topage'>
				<li class = 'tohome'></li>
				<li class = 'tokind'></li>
			</ul>
		</div>-->
		<div v-show = 'isshow0' class = 'jiesuan'>
				<div class = 'left'>
					<b @click="pointall($event)" class = 'iconfont hide quan checked'>&#xe603;</b>
					<div class = 'all'>全选</div>
					<div class = 'count'></div>
					<div class = 'money'></div>
				</div>
				<button @click="jiesuan()" class = 'tojiesun'>去结算</button>
			</div>
		</div>
	</div>
	
</template>

<script>
	import MyAjax from './../md/MyAjax.js';
	export default{
		data(){
			return{
				arr : [],
				isshow : false,
				isshow0 : true,
			}
		},
		methods:{
			count(){
				this.arr = JSON.parse(localStorage.getItem('prolist'));
				console.log(this.arr);
				var allprice = 0;
				for( var i in this.arr){
					 allprice += Number(this.arr[i].price)*Number(this.arr[i].num);
				}
				console.log(allprice);
				$('.count').html("合计：" + allprice + '元');
				localStorage.setItem('allprice',allprice);
			},
			tohome(){
				this.$router.push('/home');
			},
			add(ev,index){
				console.log(index)
				var that =this;
				var numnode = ev.target.previousSibling.previousSibling
//				console.log(ev.target.previousSibling.previousSibling)
//				console.log(numnode.innerHTML)
				numnode.innerHTML++;
				var num = numnode.innerHTML;
				console.log(ev.target);
				this.arr =JSON.parse(localStorage.getItem('prolist'));
				this.arr[index].num = num;
				var allprice = 0;
				for( var i in this.arr){
					 allprice += Number(this.arr[i].price)*Number(this.arr[i].num);
				}
				console.log(allprice);
				$('.count').html("合计：" + allprice + '元');
				localStorage.setItem('prolist',JSON.stringify(this.arr));
				localStorage.setItem('allprice',allprice);
			},
			reduce(ev,index){
//				console.log(index)
				var that = this;
				var numnode = ev.target.nextSibling.nextSibling;
				console.log(ev.target.nextSibling.nextSibling);
				console.log(numnode.innerHTML);
				numnode.innerHTML--;
				if(numnode.innerHTML < 1){
					numnode.innerHTML = 1; 
					alert('至少选择一件商品');
				}
				var num = numnode.innerHTML;
				this.arr =JSON.parse(localStorage.getItem('prolist'));
				this.arr[index].num = num;
				var allprice = 0;
				for( var i in this.arr){
					 allprice += Number(this.arr[i].price)*Number(this.arr[i].num);
				}
//				console.log(allprice);
				$('.count').html("合计：" + allprice + '元');
				localStorage.setItem('prolist',JSON.stringify(this.arr));
				localStorage.setItem('allprice',allprice);
			},
			Delete(index){
				this.arr =JSON.parse(localStorage.getItem('prolist'));
				this.arr.splice(index,1);
				var allprice = 0;
				for( var i in this.arr){
					 allprice += Number(this.arr[i].price)*Number(this.arr[i].num);
				}
				console.log(allprice);
				$('.count').html("合计：" + allprice + '元');
				localStorage.setItem('prolist',JSON.stringify(this.arr));
				localStorage.setItem('allprice',allprice);
			},
			jiesuan(){
				var arr = JSON.parse(localStorage.getItem('prolist'));
				var arr0 = [];
				var flag = true;
				for(var i in arr){
					if($('.part').eq(i).hasClass('checked')){
						arr0.push(arr[i]);
					}
				}
				console.log(arr0);
				localStorage.setItem('prolist0',JSON.stringify(arr0));
				this.$router.push('/jiesuan');
			},
			point(ev,index){
				if($(ev.target).hasClass('checked')){
					$(ev.target).removeClass('checked').addClass('unchecked');
				}else if($(ev.target).hasClass('unchecked')){
					$(ev.target).removeClass('unchecked').addClass('checked');
				}
				var arr = JSON.parse(localStorage.getItem('prolist'));
				var arr0 = [];
				var flag = true;
				for(var i in arr){
					if($('.part').eq(i).hasClass('checked')){
						arr0.push(arr[i]);
					}
					if($('.part').eq(i).hasClass('unchecked')){
						$('.quan').addClass('unchecked').removeClass('checked');
						flag = false;
					}
					if(flag == true){
						$('.quan').addClass('checked').removeClass('unchecked');
					}
				}
				console.log(arr0)
				var allprice = 0;
				for( var j in arr0){
					 allprice += Number(arr0[j].price)*Number(arr0[j].num);
				}
				$('.count').html("合计：" + allprice + '元');
				localStorage.setItem('allprice',allprice);
			},
			pointall(ev){
				if($(ev.target).hasClass('checked')){
					$(ev.target).removeClass('checked').addClass('unchecked');
					$('.part').addClass('unchecked').removeClass('checked');
					var allprice = 0;
					$('.count').html("合计：" + allprice + '元');
					localStorage.setItem('allprice',allprice);
				}else if($(ev.target).hasClass('unchecked')){
					$(ev.target).removeClass('unchecked').addClass('checked');
					$('.part').addClass('checked').removeClass('unchecked')
//					var allprice = 0;
					var arr = JSON.parse(localStorage.getItem('prolist'));
					var arr0 = [];
					var flag = true;
					for(var i in arr){
						if($('.part').eq(i).hasClass('checked')){
							arr0.push(arr[i]);
						}
					}
//					console.log(arr0)
					var allprice = 0;
					for( var j in arr0){
						 allprice += Number(arr0[j].price)*Number(arr0[j].num);
					}
					$('.count').html("合计：" + allprice + '元');
					localStorage.setItem('allprice',allprice);
					$('.count').html("合计：" + allprice + '元');
					localStorage.setItem('allprice',allprice);
				}
			}
		},
		mounted(){
			this.count();
		},
		updated(){
			if($('.cartlist').html() == ''){
				this.isshow = true;
				this.isshow0 = false;
			}else{
				this.isshow0 = true;
				this.isshow = false;
			}
			console.log(this.isshow);
		}
	}
</script>

<style scoped>
	.back{
		margin-bottom:30px;
		text-align: right;
	}
	.cartcontainer{
		width: 100%;
		padding:20px;
		height:100%;
		box-sizing: border-box;
	}
	.cartnoproimg{
		width:50%;
		position: absolute;
		left:50%;
		top:20%;
		transform: translatex(-50%);
	}
	.cartpro{
		width:100%;
		height:100px;
		display: flex;
		align-items: center;
	}
	.pro{
		width:50%;
	}
	.proname{
		width:90%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.proprice{
		color:red;
		font-size: 12px;
		margin:5px 0;
	}
	.cartproimg{
		width:40%;
		margin-right:10px;
	}
	.btn{
		border: 0;
		background: #D3D3D3;
		width:20px;
		height:20px;
		color:red;
	}
	.delete{
		float:right;
	}
	.jiesuan{
		width:100%;
        display: flex;
        align-items: center;
        background: #fff;
        height:50px;
        padding:10px;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
    }
    .left{
    	display: flex;
    	width:70%;
    }
    .left div {
    	text-align: center;
        margin: 0 10px;
    }
    .hide{
    	display: block;
	    text-align: center;
	    border-radius: 50%;
	    width:16px;
	    height:16px;
	    margin-right: 10px;
    }
    .checked{
    	color:red;
    }
    .unchecked{
    	color:#DCDCDC;
    }
	.tojiesun{
		width:100px;
        height:40px;
        margin:10px;
        border:0;
        background: orangered;
        color:#fff;
        margin-right: 20px;
	}
	.all{
		font-size: 14px;
	}
	.countbox{
		font-size: 14px;
	}
</style>