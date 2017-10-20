<style scoped lang="sass">
	.calendar{
		box-sizing: border-box;
		width:280px;
		height:35px;
		line-height:35px;
		border:solid 1px #ddd;
		background:#fff;
		cursor:pointer;
		padding-left:10px;
	};
</style>
<template>
	<div>
		<div :style="option.style" class="calendar" :id="id"></div>
	</div>
</template>
<script>
	import zaneDate from 'zane-calendar'
	export default{
		props:{
			option:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data(){
			return {
				json:{
					elem:'#zane-calendar',   
					type:'day',   
					lang:'cn',   
					width:280,  
					format:'yyyy-MM-dd HH:mm:ss',  
					value:'',  
					min:'',  
					max: '',     
					zindex:100,  
					behindTop:10,
					showtime:true,  
					showclean:true,  
					shownow:true,  
					showsubmit:true, 
					haveBotBtns:true, 
					mounted:()=>{}, 
					change:(time)=>{}, 
					done:(time)=>{
						let option = this.extend({value:time},this.option)
						this.$emit('update:option', option);
					},
				},
				id:'zane-calendar',
			}
		},
		created(){
			this.json 	= this.extend(this.option,this.json);
			this.id 	= this.json.elem.substring(1);
		},
		mounted(){
			this.$nextTick(()=>{
				zaneDate(this.json)
			});
		},
		methods:{
			extend(obj1,obj2){
				let json = obj2;
				for(let key in obj1){
					if(obj1[key]+'') obj2[key] = obj1[key];
				};
				return json;
			}
		}
	}
</script>