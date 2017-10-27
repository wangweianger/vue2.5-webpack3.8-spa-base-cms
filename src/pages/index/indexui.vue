<style lang="sass" scoped>
    .swiper-slide{height:300px;background:#ccc;}

</style>

<template>
<div class="container-fluid">
    sdfjsofjsiodfjsoidfjsodifjsdj
    <hr>
    <page-list :pageSize="search.pageSize" :callback="callback" @onPropsChange="change"></page-list>    
    当前分页数：{{search.pageSize}}
    <hr>
    <div>过滤器</div>
    <div>隐藏字体 (limitTo)：    {{data.name | limitTo(3)}}</div>   
    <div>转换为大写 (uppercase)：   {{data.name | uppercase }}</div> 
    <div>转换为小写 (lowercase)：   {{data.name | lowercase }}</div> 
    <div>money金额过滤器 (currency)：   {{data.price | currency }}</div> 
    <div>时间过滤器 (date)：   {{data.time | date }}</div> 
    <div>时间过滤器 (date)：   {{data.date | date('-',true) }}</div>      
</div>
</template>

<script>
    import Vue from 'vue'
    import pageList from 'components/pageList'
    
    export default {
        components: {
           pageList,
        },
        data(){
            return {
                search:{
                    pageSize:20, 
                },
                data:{
                    name:'wangwei',
                    age:25,
                    price:1502,
                    time:1482210843992,
                    date:new Date(),
                    datas:[
                        {id:1,size:103,big:'tio'},
                        {id:1,size:103,big:'tio'},
                        {id:1,size:103,big:'tio'},
                        {id:1,size:103,big:'tio'}
                    ]
                }
            }
        },
        events: {
            'child-tell-me-something' (msg) {
                console.log(msg);
            }
        },
        mounted() {
            this.$nextTick(()=>{
                console.log(this.$route);
            })
        },
        methods: {
            change:function(propName,newVal,oldVal){
                this.search[propName]=newVal;
            },
            callback(){
                console.log(this.search.pageSize);
            },
           
        }
    }
</script>

