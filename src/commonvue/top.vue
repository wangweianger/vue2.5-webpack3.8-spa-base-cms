<style scoped lang="sass">
	.header{
		padding:0px;
		overflow: hidden;
		h3{
			font-size: 16px;
			margin:0;
			line-height: 50px;
			float:right;
			.user{
				font-weight: normal;
				font-size: 12px;
				color:#888;
			}
			img{
				width:22px;
				height:22px;
				margin-right:5px;
			}
			.block{
				text-decoration: none;
				display: inline-block;
				height:50px;
				padding:0 15px;
				font-size:13px;
				color:#333;
				position:relative;
				border-left:solid 1px #eee;
				i{
					display: block;
					width:100%;
					height:3px;
					position:absolute;
					background: #5974d9;
					left:2px;
					top:-1px;
					display:none;
				}
			}
			.icon{
				em{
					font-size:32px;
				}
			}
			.block:hover{
				i{
					display:block;
				}
			}
		}
		.menuicon {
			cursor: pointer;
			border-right:1px solid #6981ca;
			color: #fff;
			padding: 10px 8px;
			position: absolute;
			left: 0px;
			width:45px;
			height:100%;
			background:#5974d9;
			i {
				height:1px;
				margin-left:2px;
				width:80%;
				display:block;
				background:#fff;
				margin-bottom:6px;
			}
			i:nth-child(1) {
				margin-top:7px;
			}
			&:hover{
				i {
					background:#fff;
				}
			}
		}
		.left_color{
			width:220px;
			height:50px;
			float:left;
			background:#5974d9;
			color:#fff;
			padding-left:50px;
			line-height:50px;
			font-size:14px;
		}
		.active{
			background:#fff;
			color:#333;
			font-size:16px;
			font-weight:bold;
		}
	}
	@media (max-width: 768px) { 
		.header{
			padding:0 0px 0 54px;
			background:#5974d9;
			.left_color{
				width:auto;
				padding-left:0px;
			}
			h3{
				color:#fff;
				.block,.user{
					color:#fff;
				}
				.block{
					border-left:solid 1px #778bd6;
				}
			}
		}
	}
</style>
<template>
	<div class="header">
		<div class="left_color">订单分析系统</div>
		<span class="visible-xs menuicon" @click="toggleleftbar($event)"><i></i><i></i><i></i></span>
		<span class="hidden-xs menuicon" @click="leftBarToggleFn($event)"><i></i><i></i><i></i></span>
		<h3>
			<span class="user mr10">欢迎您,{{user?user:'启明星小白'}}</span>
			<a class="block" href="javascript:;" v-on:click="isquanping"><i></i><em class="bigiconfont">&#xe70d;</em></a>
			<!-- <a class="block acolor" href="javascript:;"><i></i><em>返回VENUS</em></a> -->
			<a class="block icon" href="javascript:;" @click="logout"><i></i><em class="iconfont">&#xe618;</em></a>
		</h3>
	</div>
</template>
<script>
	import propsync from 'common/lib/mixin/propsync'
	export default {
		props:{
			leftBarToggle:{
				type:null,
				toWay:true,
				default:false
			}
		},
		mixins: [propsync],
		data : function(){
			return {
				user:$.cookie('username'),
				clickstatus:1,
				isQuanPing:false,
			}
		},
		methods : {
			//登出
			logout(){
				popup.confirm({title:'确定退出？',yes:function(){
					$.cookie('username','',{expires:-1,path:'/'});
					location.href="/html/login.html";
				}});
			},
			toggleleftbar($event){
				var _this = this;
				if(_this.clickstatus == 1){
					_this.clickstatus = 2;
					$('#left').css('left',0);
				}else {
					_this.clickstatus = 1;
					$('#left').css('left',-220);
				}
			},
			leftBarToggleFn($event){
				if(this.p_leftBarToggle){
					$('#left-nav').find('ul.nav-box').removeClass('slideUl');
					$('#left').css({'width':'220px'})
					$('#content').css({'marginLeft':'220px'})
					this.p_leftBarToggle=false;
					$('.left_color').removeClass('active')
				}else{
					$('#left-nav').find('ul.nav-box').addClass('slideUl');
					$('#left').css({'width':'45px'})
					$('#content').css({'marginLeft':'45px'})
					this.p_leftBarToggle=true;
					$('.left_color').addClass('active')
				}
			},
			// 判断是否是全屏
			isquanping(){
				if(this.isQuanPing){
					this.exitFull();
				}else{
					this.requestFullScreen();
				}
			},
			// 全屏
			requestFullScreen(){
				this.isQuanPing=true;
				var element=document.documentElement;
				// 判断各种浏览器，找到正确的方法
			    var requestMethod = element.requestFullScreen || //W3C
			    element.webkitRequestFullScreen ||    //Chrome等
			    element.mozRequestFullScreen || //FireFox
			    element.msRequestFullScreen; //IE11
			    if (requestMethod) {
			        requestMethod.call(element);
			    }
			    else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
			        var wscript = new ActiveXObject("WScript.Shell");
			        if (wscript !== null) {
			            wscript.SendKeys("{F11}");
			        }
			    }
			},
			//退出全屏 判断浏览器种类
			exitFull(){
				this.isQuanPing=false;
				// 判断各种浏览器，找到正确的方法
			    var exitMethod = document.exitFullscreen || //W3C
			    document.mozCancelFullScreen ||    //Chrome等
			    document.webkitExitFullscreen || //FireFox
			    document.webkitExitFullscreen; //IE11
			    if (exitMethod) {
			        exitMethod.call(document);
			    }
			    else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
			        var wscript = new ActiveXObject("WScript.Shell");
			        if (wscript !== null) {
			            wscript.SendKeys("{F11}");
			        }
			    }
			},
		}
	}
</script>