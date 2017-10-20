<style scoped lang="sass">
	.brank_nav{
		font-size:12px;
	}
</style>
<template>
  <ol class="brank_nav">
    <li><span class="cursor" v-link="{path:'/order_list'}">首页</span></li>
    <slot name="nav_two"></slot>
    <slot name="nav_other"></slot>
    <li>{{$route.title}}</li>
</ol>
</template>
