<template>
	<div class = 'addressbox'>
		<div @click="back" class = 'back'>
			返回
		</div>
		<div v-show = 'isshow' class = 'mengban'>
			<input class = 'name' ref = 'name' type="text" placeholder="收件人姓名" />
			<input class = 'phone' ref = 'phone' type="number" placeholder="收件人手机号" />
			<input class = 'bian' ref = 'number' type="number"  placeholder="邮编"/>
			<div id="province"></div>
			<input class = 'detailaddress' type="text" placeholder="请输入详细地址"/>
			<div class = 'btnbox'>
				<button @click="cun()" class = 'cun'>保存并返回</button>
				<button @click="hide()" class = 'pageback'>返回</button>	
			</div>
			
			<div class = 'tip'>
			
			</div>
		</div>
		<div v-for = 'item in arr' class = 'msg'>
			<div class = 'top'>
				<div class = 'username'>
					{{item.name}}
				</div>
				<div class = 'phone'>
					{{item.phone}}
				</div> 
			</div>
			<div class = 'bottom'>
					{{item.detailaddress}}
			</div>
		</div>
		<footer @click="show()" class = 'addressfooter'>
				新增地址
		</footer>
	</div>
</template>

<script>
	import Toast from './../md/Toast.js';
	export default{
		data(){
			return{
				isshow : false,
				arr : []
			}
		},
		methods:{
			back(){
				window.history.go(-1);
			},
			show(){
				this.isshow = true;
			},
			hide(){
				this.isshow = false;
			},
			cun(){
				console.log(111);
				var that = this;
				var username = $('.name').val();
				var phone = $('.phone').val();
				var bian = $('.bian').val();
				var detailaddress = $('.detailaddress').val();
				console.log($('select option:selected').text());
				var cityaddress = $('select option:selected').text();
				var address = cityaddress + detailaddress;
				var res = /^1[34578]\d{9}$/
				if(!res.test($(that.$refs.phone).val())){
					console.log(222)
					Toast.makeText('请输入正确格式',2000);
				}else if($(that.$refs.phone).val() == '' || $(that.$refs.number).val() == '' || $(that.$refs.name).val() == ''){
					Toast.makeText('请填写完整内容',2000);
				}else{
					var obj = {
						name : username,
						phone : phone,
						bian : bian,
						detailaddress : address
					}
					console.log(obj);
					this.isshow = false;
					this.arr.push(obj);
					localStorage.setItem('address',JSON.stringify(this.arr));	
				}
			}
		},
		mounted(){
			$(function(){
			    $("#province").ProvinceCity()
			});
			console.log(123);
			if(localStorage.getItem('address')){
				this.arr = JSON.parse(localStorage.getItem('address'));
				console.log(localStorage.getItem('address'))
			}else{
				this.arr = [];
			}
		},
	}
</script>

<style scoped>
	.addressbox{
		padding:20px;
		box-sizing: border-box;
	}
	.back{
		height:50px;
		width:50px;
		border-radius: 50%;
		line-height: 50px;
		background: #f66;
		text-align: center;
		color:#fff;
		margin-bottom:20px;
	}
	.addressfooter{
		position: fixed;
		max-width: 640px;
		bottom: 0;
		height:50px;
		width:90%;
		color:#f66;
		line-height: 50px;
		text-align: center;
		border-top: 1px solid #808080;
	}
	.mengban{
		padding:20px;
		position: fixed;
		top:0;
		left:0;
		width:100%;
		height: 100%;
		background: #fff;
		z-index: 999;
		box-sizing: border-box;
	}
	.mengban input{
		width: 100%;
		border:0;
		border-bottom: 1px solid #D3D3D3;
		padding:10px;
	}
	.mengban button{
		width:150px;
		height:50px;
		border:0;
	}
	.btnbox{
		width:100%;
		display: flex;
		justify-content: space-around;
		padding-top:70px;
	}
	.msg{
		padding:10px 20px;
		border-bottom: 1px solid #A9A9A9;
	}
	.cun{
		background: red;
		color:#fff
	}
	.pageback{
		background: #666666;
		color:#fff
	}
	#province{
		padding:20px;
	}
	.top{
		display: flex;
		justify-content: space-between;
	}
	.bottom{
		font-size: 12px;
		color: #808080;
		margin-top:10px;
	}
	.tip{         
         background:rgba(0,0,0,0.4);
         display: none;
         height:40px;
         text-align: center;
         line-height: 40px;
         color: #fff;
         position: absolute;
         padding: 7px;
         top:400px;
         margin-left:30%;
     }
</style>