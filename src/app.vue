<style>
	html,body{
		height: 100%;
		background: #f8f9fa!important;
	}
	#header{
		height: 50px;
	    position: fixed;
	    min-width: 100%;
	    z-index: 100;
	    box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1);
	    background: #fff;
	}
	#left{
		position: fixed;
	    top: 50px; 
	    left: 0;
	    bottom: 0;
	    padding: 0px 0 50px;
	    width: 220px; 
	    min-width: 45px;
	    max-height: 100vh;
	    height: 100%;  
	    z-index: 99;
	    background: #3f4457;
	    overflow-y: auto;
	    overflow-x: hidden;
	    padding-top:20px;
	    box-shadow: inset -1px 0 0 0 rgba(0, 0, 0, 0.1);
	}
	#content{
		padding: 50px 10px 10px 0;
	    margin-left: 220px;
	    overflow-y: auto;
	}
	@media (max-width: 768px) { 
		#content{
			margin-left: 0;
			padding: 50px 0 10px;
		}
		#left{
			left: -220px;
		}
	}
</style>

<template>
	<div id="mainbody">
		<header id="header" class="fontCorlor">
			<top :left-bar-toggle="leftBarToggle" @onPropsChange="change"></top>
		</header>
		<div id="left">
			<side :left-bar-toggle="leftBarToggle" @onPropsChange="change"></side>
		</div>
		<div id="content">
      		<router-view class="view"></router-view>
      	</div>
      	<totop></totop>
    </div>
</template>

<script>
  	import store from './vuex/store';
  	import totop from 'components/totop'
  	import top from 'commonvue/top'
  	import side from 'commonvue/side'
  	export default {
  		name: 'app',
	  	components :{
	  		totop,
	  		top,
	  		side
	  	},
	    store,
	    data(){
	    	return{
	    		leftBarToggle:false,
	    	}
	    },
	    methods:{
	    	change:function(propName,newVal,oldVal){
	            this[propName]=newVal;
	        },
	    }
  	}
</script>

