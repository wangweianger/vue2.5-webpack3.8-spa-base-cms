/**
 * @author wangwei
 * @since 17/4/1
 */
var HttpPush=require('./http.push.js')
var fs = require('fs');
var Promise = require('bluebird')
var targz = require('tar.gz');
var exec = require('child_process').exec;
let path = require('path')


/*-------------发布代码的类--------------------*/
class httpPushTarGz {

    //初始化对象
    constructor(option){
        //default 设置
        this.option={
            receiver  : 'http://127.0.0.1:1234/receiver',
            distDir   : path.resolve(__dirname, '../dist/targz'),  //生成tar.gz包的文件夹
            proDir    : path.resolve(__dirname, '../dist/test'), //上传的目标文件夹
            copyDir   : path.resolve(__dirname, '../dist/html'), //复制的目标文件夹
            tarGzName : 'build.tar.gz', //压缩后的名字
            to        : '../html',  //服务器 放置目录
            data:{
                isDelDir  : 'no',  //是否删除服务端文件   no || yes
                exclude   : '',   //服务器不需要删除的文件夹
            }
            
        }
        this.option=this.extend(this.option,option);

        this.init();
    };

    init(){
        let isHave=fs.existsSync(this.option.distDir)
        if(isHave){
            this.httpPushForTar();
        }else{
            fs.mkdirSync(this.option.distDir)
            this.httpPushForTar();
        }
    };

    //压缩并上传
    httpPushForTar(){
        this.copyDirFn(()=>{
            targz().compress(this.option.copyDir, `${this.option.distDir}/${this.option.tarGzName}`)
            .then(()=>{
                console.log('Job done!');
                new HttpPush({
                    receiver: this.option.receiver,
                    buildDir: this.option.distDir,
                    to: this.option.to,
                    data:this.option.data,
                }) 
            })
            .catch((err)=>{
                console.log('Something is wrong ', err.stack);
            });
        });
    };

    // 复制文件
    copyDirFn(fn){
        let isProDirHave=fs.existsSync(this.option.proDir)
        let isCopyDirHave=fs.existsSync(this.option.copyDir)

        if(!isProDirHave) return false;

        // 没有目标文件创建
        if(isProDirHave&&!isCopyDirHave){   
            exec(`cp -r ${this.option.proDir} ${this.option.copyDir}` , (err,out)=>{
                if(err){console.log(err); };
                fn&&fn()
            });
        //有目标文件先删除再创建    
        }else if(isProDirHave&&isCopyDirHave){
            exec(`rm -rf ${this.option.copyDir}` ,(err,out)=>{
                if(err){console.log(err); };
                exec(`cp -r ${this.option.proDir} ${this.option.copyDir}` ,(err,out)=>{ 
                    if(err){console.log(err); };
                    fn&&fn()
                });
            });
        }
    };

    // extend
    extend(json1,json2){
        for(let key in json2){
            if(typeof(json2[key])=='object'){
                for(let k in json2[key]){
                    json1[key][k] = json2[key][k]
                }
            }else{
                json1[key] = json2[key]
            }
        }
        return json1;
    };

}

/*--------------发布代码配置-------------------*/
// new httpPushTarGz({
//     receiver  : 'http://test.venus.morning-star.cn/http-push-test/receiver',
// });

module.exports = httpPushTarGz;





