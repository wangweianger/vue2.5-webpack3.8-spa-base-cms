<style lang="sass" scoped>
    .swiper-slide{height:300px;background:#ccc;}

</style>

<template>
<div class="container-fluid">
      000000000000000000000000000000000000000000000000000000000000000000000000

    <div class="page_box tr clear mt20 mr20">
        <page :isSearch="search.isSearch" :now-page="search.page" :page-size="search.pageSize" :total-count="search.totalcount" @onPropsChange="change"></page>
    </div>
    <hr>
        时间选择器组件封装
        <select-time-common :begin="begin" :end="end" :datas="datas" @onPropsChange="change"></select-time-common>
        开始时间：<span v-text="begin"></span> &nbsp; &nbsp; &nbsp; 结束时间：<span v-text="end"></span>  
    <hr>

    时间选择器组件封装
    <vue-date-calendar :option.sync="option"></vue-date-calendar>


</div>
</template>

<script>
    import Vue from 'vue'
    import page from 'components/page'
    import selectTimeCommon from 'components/select_time_common'
    import vueDateCalendar from 'commonvue/zane-calendar'
    import axios from 'axios'

    export default {
        components: {
           page,
           selectTimeCommon,
           vueDateCalendar 
        },
        data(){
            return {
                option:{
                    elem:'#zane-calendar', 
                    type:'day',  
                },
                search:{
                    page:1,
                    pageSize:10,
                    totalcount:100,
                    isSearch:true,
                },
                datas:{
                    istime:true
                },
                begin:1477630954604,
                end:1477630954604,
            }
        },
        vuex: {
            getters: {
                // index: ({ index }) => index
            },
            actions: {

            }
        },
        mounted() {
            this.$nextTick(()=>{
                   
            })
        },
        methods: {
            change:function(propName,newVal,oldVal){
                this[propName]=newVal;
                this.datas[propName]=newVal;
            }
        }
    }
</script>
<style lang="sass">

</style>

