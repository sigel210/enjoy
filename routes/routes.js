
import Header from './../com/Header.vue';
import MoreHeader from './../com/MoreHeader.vue';
import Footer from './../com/Mainfooter.vue'
import Home from './../com/Home.vue';
import Search from './../com/search.vue'; 
import Fenkind from './../com/Fenkind.vue';
import Fenkindpro from './../com/Fenkindpro.vue';
import Kind from './../com/Kind.vue';
import Login from './../com/Login.vue';
import Invertion from './../com/Invertion.vue';
import User from './../com/User.vue';
import UserHeader from './../com/UserHeader.vue'
import Detail from './../com/Detail.vue';
import Cart from './../com/Cart.vue';
import Jiesuan from './../com/jiesun.vue';
import Address from './../com/address.vue';

const routes = [
	{path : '/' , redirect : '/home/140'},
	{path : '/home' , redirect : '/home/140'},
	{path :　'/home' , components:{
		default : Home,
		header : Header,
		footer : Footer
	}},
	{path :　'/home/:cityid' , name : 'home' , components:{
		default : Home,
		header : Header,
		footer : Footer
	}},
	{path :　'/detail' , components:{
		default : Detail,
		header : MoreHeader,
	}},
	{path :　'/detail/:proid' , name : 'detail' , components:{
		default : Detail,
		header : MoreHeader,
	}},
	{path : '/search' , components : {
		default : Search,
		header : Header
	}},
	{path : '/search/:cityid/:foodkey' , name : 'search' ,  components : {
		default : Search,
		header : MoreHeader
	}},
	{path :　'/fenkind' , components:{
		default : Fenkind,
		header : Header,
		footer : Footer
	}},
	{path :　'/fenkind/:cityeco', name : 'fenkind' , components:{
		default : Fenkind,
		header : Header,
		footer : Footer
	}},
	{path : '/fenkindpro' , components:{
		default : Fenkindpro,
		header : Header
	}},
	{path : '/fenkindpro/:prolist' , name : 'fenkindpro' , components:{
		default : Fenkindpro,
		header : Header
	}},
	{path :　'/kind' , components:{
		default : Kind,
		header : MoreHeader,
		footer : Footer
	}},
	{path : '/login' , components : {
		default : Login
	}},
	{path :　'/invertion' , components:{
		default : Invertion,
		footer : Footer
	}},
	{path :　'/user' , components:{
		default : User,
		header : UserHeader,
		footer : Footer
	}},
	{path : '/cart' , components : {
		default : Cart
	}},
	{path : '/jiesuan' , components : {
		default : Jiesuan
	}},
	{path : '/address' , components : {
		default : Address
	}}
]
export default routes;
