<style lang="sass" scoped>
    // 拖拽头图
    .common_drop_photo{
        overflow: hidden;
        .drop_area{
            width:0;
            height:0;
            border:dashed 2px #ccc;
            text-align: center;
            line-height:0;
            font-size: 0; 
            cursor:pointer;
        }
        .drop_area.sm{
            width:140px;
            height: 50px;
            line-height: 50px;
            font-size: 12px;

        }
        .drop_area.md{
            width:280px;
            height: 100px;
            line-height: 100px;
            font-size: 20px;
        }
        .drop_area.lg{
            width:560px;
            height: 200px;
            line-height: 200px;
            font-size: 36px;
            color:#ccc;
        }
        .drop_yulan{
            width: 100%;
            padding: 10px;
            
        }
    }
</style>

<template>
    <div class="common_drop_photo" v-if='!ua'>
        <!-- 拖拽头图 -->
        <div :id="p_options.el" class="drop_area">点击或者将图片拖拽到此区域</div>
        <!-- 预览头图 -->
        <div :id="p_options.elyl" class="drop_yulan"></div>
    </div>
</template>

<script>
    import propsync from 'common/lib/mixin/propsync'
    export default {
        props:{
            options:{
                type: Object,
                twoWay: true,
                default:{},
            },
            callback:{
                type: Function,
            },
        },
        mixins: [propsync],
        data(){
            return {
                ua:util.ie
            }
        },
        created(){
            var config={
                el:'drop_area',//拖拽区域html盒子
                elyl:'drop_yulan',//预览html盒子
                isylShow:false,//是否默认显示预览区域
                file:'myfiles',//上传文件file
                data:{},//额外参数
                url:'',//ajax上传api,#####必填#####
                checktype:['jpg','png','gif','jpeg'],//上传图片类型
                boxSize:'md',//设置盒子大小
                isSingle:false,//是否只允许单张上传，默认为多张上传
                isSingleText:null,//单文件上传提示，考虑到调用util.cerateFileFormData方法,所以默认值设为null
                showSort:false,//是否判断文件后缀名
            }
            // 处理继承
            for(var i in config){
                for(var k in this.p_options){
                    if(i==k){
                        config[k]=this.p_options[k]
                    }
                }
            }
            this.p_options=config;
        },
        mounted(){
            this.$nextTick(()=>{
                //拖拽上传图片 阻止浏览器默认行。 
            $(document).on({ 
                dragleave:function(e){    //拖离 
                    e.preventDefault(); 
                }, 
                drop:function(e){  //拖后放 
                    e.preventDefault(); 
                }, 
                dragenter:function(e){    //拖进 
                    e.preventDefault(); 
                }, 
                dragover:function(e){    //拖来拖去 
                    e.preventDefault(); 
                } 
            }); 
            var box = document.getElementById(this.p_options.el); //拖拽区域
            //根据传参改变盒子大小
            switch(this.p_options.boxSize){
                case 'sm':
                $('#'+this.p_options.el).addClass('sm');
                break;
                case 'md':
                $('#'+this.p_options.el).addClass('md');
                break;
                case 'lg':
                $('#'+this.p_options.el).addClass('lg');
                break;
            }
            //监听点击事件上传图片
            box.addEventListener('click',(e)=>{
                var json={
                    url:this.p_options.url,
                    checktype:this.p_options.checktype,
                    filename : this.p_options.file,
                    isSingle: this.p_options.isSingle,
                    showSort:true,
                    success:((data,sortList)=>{
                        this.callback&&this.callback(data,sortList);
                    })
                }
                if(this.p_options.isSingleText){
                    json.isSingleText=this.p_options.isSingleText
                }
                console.log(111)
                util.cerateFileFormData(json)
            });
            //监听拖拽事件上传图片
            box.addEventListener('drop',(e)=>{
                e.preventDefault(); //取消默认浏览器拖拽效果 
                var fileList = e.dataTransfer.files; //获取文件对象
                var checkFileType=this.p_options.checktype;//上传文件类型
                var isSingleText=this.p_options.isSingleText||'请上传单张图片！'
                var fileListSort=[];//上传文件的文件名后两位arr;
                var isNumber=true;//判断是否为数字
                //检测是否是拖拽文件到页面的操作 
                if(fileList.length == 0){ 
                    return false; 
                }
                //检测是否单张图片
                if(this.p_options.isSingle&&fileList.length>1){
                    Popup.alert({type:'msg',title:isSingleText});
                    return false;
                }
                //检测文件是不是图片 
                for(var i=0;i<fileList.length;i++){
                    var begin=false;
                    for(var k=0;k<checkFileType.length;k++){
                        var result=new RegExp("\."+checkFileType[k]+"$",'i').test(fileList[i]['name'])
                        if(result){
                            begin=true
                        }
                    }
                    if(!begin){
                        Popup.alert({title:'请上传正确的文件类型！'}); return false;
                    }
                    fileListSort.push(fileList[i]['name'].replace(/(.*\/)*([^.]+).*/ig,"$2").slice(-2));//将文件名后两位push
                }
                //如果showSort为真，判断是否为数字
                if(this.p_options.showSort){
                    fileListSort.forEach((item,index)=>{
                        if(!util.regCombination('n').test(item)){
                            isNumber=false;
                        }
                    })
                }
                if(!isNumber){
                    popup.alert({type:'error',title:'请确认图片名称后两位是否为数字！'});
                    return false;
                }
                //拖拉图片到浏览器，可以实现预览功能 
                var html="";
                var formData = new FormData();  
                for(var i=0;i<fileList.length;i++){
                    html+=`<div style="width:120px;height:100px;float:left;border:1px solid #ccc; padding:3px;border-radius:3px">
                         <img style="width:100% ;height:auto;display:block" src="${window.webkitURL.createObjectURL(fileList[i])}"/>
                         <span style="display:block;text-align:center;color:#6f8fb7;">${fileList[i].name}</span>
                         </div>`;
                    formData.append(this.p_options.file, fileList[i]);        
                };
                for(let n in this.p_options.data){
                    formData.append(n, this.p_options.data[n]);
                }
                if(this.p_options.isylShow){
                    $('#'+this.p_options.elyl).html(html); 
                }
                $('#loading').stop().fadeIn(200);
                // ajax上传
                util.fileAJAX({
                    url:this.p_options.url,
                    data:formData,
                    success:(data=>{
                        if(this.p_options.showSort){
                            this.callback&&this.callback(data,fileListSort);
                        }else{
                            this.callback&&this.callback(data);   
                        }
                    })
                }); 
            })
            })
        },
        methods:{

        }
    }
</script>

