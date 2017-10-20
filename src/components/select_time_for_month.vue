<style lang="sass" scoped> 
    .time_common{
        overflow: hidden;
        .item{
            display: inline-block;
            margin-right:0px;
            input{
                border-radius:3px;
            }
        }
    }
</style>
<template>
   <div class="time_common">
        <div class="item"><span v-if="p_datas.isShowTitle" v-text="p_datas.titleBeginText"></span><input :style="{'width':p_width+'px'}" :placeholder="p_datas.isShowPlaceholder?'选择开始时间':''" class="laydate-icon input-model" :id="p_datas.beginId" type="text" v-on:input="getBeginTime($event)"></div>
        <div v-if="!p_datas.isOneTime" class="item"><span v-if="p_datas.isShowTitle" v-text="p_datas.titleEndText"></span><input :style="{'width':p_width+'px'}" :placeholder="p_datas.isShowPlaceholder?'选择结束时间':''" class="laydate-icon input-model" :id="p_datas.endId" type="text" v-on:input="getEndTime($event)"></div>
   </div>
</template>
<script type="es6">
    require('common/lib/simpleCanleder/SimpleCanleder.css')
    require('common/lib/simpleCanleder/SimpleCanleder.js')
    import propsync from 'common/lib/mixin/propsync'
    export default{
        props:{
            datas:{
                type:Object,
                default:(()=>{
                    return {}
                }),
            },
            begin:{
                type:null,
                default:null,
            },
            end:{
                type:null,
                default:null,
            },
            width:{
                type:null,
                default:150,
            }
        },
        mixins: [propsync],
        created(){
            var config={
                beginId:'beginId_for_month',
                endId:'endId_for_month',
                isOneTime:false, //是否只需要一个时间
                isShowPlaceholder:true,  //是否展示placeholder
                isShowTitle:false, //是否显示title
                titleBeginText:'开始时间：', //title 开始 文字
                titleEndText:'结束时间：', //title 结束 文字
            };
            // 处理继承
            for(var i in config){
                if(!this.p_datas) return ;
                for(var k in this.p_datas){
                    if(i==k){
                        config[k]=this.p_datas[k]
                    }
                }
            }
            this.p_datas=config;
        },
        mounted() {
            this.$nextTick(()=>{
                $('#'+this.p_datas.beginId).simpleCanleder({
                    callback:((data,id)=>{
                        if(id==this.p_datas.beginId){
                            this.p_begin=data+'/1';
                        }else{
                            if(!this.p_datas.isOneTime){
                                let totaldate=common.getCountDays(data)
                                this.p_end=data+'/'+totaldate;
                            }
                        }
                    })
                });
                if(!this.p_datas.isOneTime){
                    $('#'+this.p_datas.endId).simpleCanleder({
                        callback:((data,id)=>{
                            if(id==this.p_datas.endId){
                                let totaldate=common.getCountDays(data)
                                this.p_end=data+'/'+totaldate;;
                            }else{
                                if(!this.p_datas.isOneTime){
                                    this.p_begin=data+'/1';
                                }
                            }
                        })
                    });
                };
            })
        },
    }

</script>
