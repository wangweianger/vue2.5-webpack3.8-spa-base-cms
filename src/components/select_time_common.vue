<style lang="sass" scoped> 
    .time_common{
        overflow: hidden;
        .item{
            display: inline-block;
            margin-right:10px;
            input{
                border-radius:3px;
            }
        }
    }
</style>
<template>
   <div class="time_common">
        <div class="item"><span v-if="p_datas.isShowTitle" v-text="p_datas.titleBeginText"></span><input :style="{'width':p_width+'px'}" :placeholder="p_datas.isShowPlaceholder?p_datas.titleBeginText:''" class="laydate-icon input-model" :id="p_datas.beginId" type="text"></div>
        <div v-if="!p_datas.isOneTime" class="item"><span v-if="p_datas.isShowTitle" v-text="p_datas.titleEndText"></span><input :style="{'width':p_width+'px'}" :placeholder="p_datas.isShowPlaceholder?p_datas.titleEndText:''" class="laydate-icon input-model" :id="p_datas.endId" type="text"></div>
   </div>
</template>
<script type="es6">
    /*
        十分重要： 此组件 如果一个人页面有多个时间选择器 则传入的开始时间名字跟 id 保持一致
    */
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
        data(){
            return{
                id:'',
                beginid:'',
                endid:''
            }
        },
        created(){
            var config={
                beginId:'begin',
                endId:'end',
                isOneTime:false, //是否只需要一个时间
                isShowPlaceholder:true,  //是否展示placeholder
                isShowTitle:false, //是否显示title
                titleBeginText:'开始时间：', //title 开始 文字
                titleEndText:'结束时间：', //title 结束 文字
                event: 'click', //触发事件
                format: 'YYYY/MM/DD', //日期格式
                istime: false, //是否开启时间选择
                isclear: true, //是否显示清空
                istoday: true, //是否显示今天
                issure: true, //是否显示确认
                festival: true, //是否显示节日
                min: '1900/01/01 00:00:00', //最小日期
                max: '2099/12/31 23:59:59', //最大日期
                start: laydate.now(),  //开始日期
                fixed: false, //是否固定在可视区域
                zIndex: 10000, //css z-index
                effectivetime:null,  //默认不限制范围 限制时传整数 例如:30  表示只能选择开始后的30天
                skin:'default',   //可选参数  default,dahong,danlan,molv
            };
            // 处理时间格式
            if(config.istime) config.format='YYYY/MM/DD hh:mm:ss';
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
               // 起始时间如果有就先赋值
                if(this.p_begin){
                    if(this.p_datas.istime){ 
                        $('#'+this.p_datas.beginId).val(moment(this.p_begin).format('YYYY/MM/DD hh:mm:ss'));
                    }else{  
                        $('#'+this.p_datas.beginId).val(moment(this.p_begin).format('YYYY/MM/DD'));
                    }
                };
                if(!this.p_datas.isOneTime){
                    if(this.p_end){
                        if(this.p_datas.istime){   
                            $('#'+this.p_datas.endId).val(moment(this.p_end).format('YYYY/MM/DD hh:mm:ss'));
                        }else{
                            $('#'+this.p_datas.endId).val(moment(this.p_end).format('YYYY/MM/DD'));
                        }
                    }; 
                };
                switch(this.p_datas.skin){
                    case 'dahong':
                        require('common/lib/laydate/skins/dahong/laydate.css');
                        break;
                    case 'danlan':
                        require('common/lib/laydate/skins/danlan/laydate.css');
                        break;  
                    case 'molv':
                        require('common/lib/laydate/skins/molv/laydate.css');
                        break;     
                }
                //时间筛选器
                var begin={
                    elem: '#'+this.p_datas.beginId,
                    event: this.p_datas.event, //触发事件
                    format: this.p_datas.format, //日期格式
                    istime: this.p_datas.istime, //是否开启时间选择
                    isclear:this.p_datas.isclear,
                    istoday: this.p_datas.istoday, //是否显示今天
                    issure: this.p_datas.issure, //是否显示确认
                    festival: this.p_datas.festival, //是否显示节日
                    min: this.p_datas.min, //最小日期
                    max: this.p_datas.max, //最大日期
                    start: this.p_datas.start,  //开始日期
                    fixed: this.p_datas.fixed, //是否固定在可视区域
                    zIndex: this.p_datas.zIndex, //css z-index
                    choose:((data)=>{
                        this.p_begin=data?Date.parse(data):data;
                        this.$emit('onPropsChanges', this.beginid,data?Date.parse(data):data); 

                        if(!this.p_datas.isOneTime){
                            if(Date.parse(data)>this.p_end) {
                                this.p_end="";
                                this.$emit('onPropsChanges', this.endid, ''); 
                                $('#'+this.p_datas.endId).val(this.p_end);
                            }
                            end.min = data
                            end.start = data 
                            // 限制时间范围
                            if(this.p_datas.effectivetime){
                                var beginTimes=Date.parse(data);
                                var times = this.p_datas.effectivetime*24*3600000;
                                end.max=new Date(beginTimes+times).date('y/m/d');
                            };
                        };    
                    }),
                    click:(data=>{
                        this.id=data
                        this.beginid=data;
                    })
                };
                var end={
                    elem: '#'+this.p_datas.endId,
                    event: this.p_datas.event, //触发事件
                    format: this.p_datas.format, //日期格式
                    istime: this.p_datas.istime, //是否开启时间选择
                    isclear:this.p_datas.isclear,
                    istoday: this.p_datas.istoday, //是否显示今天
                    issure: this.p_datas.issure, //是否显示确认
                    festival: this.p_datas.festival, //是否显示节日
                    min: this.p_datas.min, //最小日期
                    max: this.p_datas.max, //最大日期
                    start: this.p_datas.start,  //开始日期
                    fixed: this.p_datas.fixed, //是否固定在可视区域
                    zIndex: this.p_datas.zIndex, //css z-index
                    choose:((data)=>{
                        // 如果没开启时间选择，才让结束时间加86399999毫秒(开始)
                        if(this.p_datas.istime){
                            this.p_end=data?(Date.parse(moment(data).toDate())):data;
                            this.$emit('onPropsChanges', this.endid,data?Date.parse(data):data); 
                        }else{
                            this.p_end=data?(Date.parse(moment(data).toDate())+86399999):data;
                            this.$emit('onPropsChanges', this.endid,data?(Date.parse(moment(data).toDate())+86399999):data); 
                        }
                        // 如果没开启时间选择，才让结束时间加86399999毫秒(结束)
                        if(this.p_begin>this.p_end){
                            this.p_begin='';
                            this.$emit('onPropsChanges', this.beginid, ''); 
                            $('#'+this.p_datas.beginId).val(this.p_begin);
                        }
                    }),
                    click:(data=>{
                        this.id=data
                        this.endid=data;
                    })
                };
                laydate(begin)
                if(!this.p_datas.isOneTime){
                   laydate(end) 
               }; 
          })
        },
    }
</script>
<style>
   
</style>