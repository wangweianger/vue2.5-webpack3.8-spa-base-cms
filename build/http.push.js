/**
 * @author wangwei
 * @since 17/4/1
 */
var fs = require('fs');
var path = require('path');
var u = require('underscore');
var request = require('request');
var log = require('log-util');
var chalk = require('chalk');

/**
 * http上传插件
 *
 * @param options
 * @param options.receiver
 * @param options.to
 * @param options.token
 *
 * @constructor
 */
class HttpPush {
    //初始化对象
    constructor(option){
        this.option=option
        this.uploadFiles();
    };

    //上传文件
    uploadFiles(){
        this.walkDir(this.option.buildDir+'/',src=>{
            let arr=this.option.buildDir.split('/')
            let arr1=[]
            arr.forEach((item,index)=>{
                if( item != '.' ){
                    arr1.push(item)
                }
            })
            let base=arr1.join('/')
            let file=src.replace(base+'/','')
            let json={
                receiver: this.option.receiver,
                data:this.option.data,
                src:src,
                file:file,
            }
            json.data.basesrc=this.option.to
            json.data.to=this.option.to+'/'+file

            this.upload(json.receiver,json.data,json.src,json.file,function(err, res){
                if (err) {
                        log.error(json.file + ' - ' + chalk.red('[error] [' + err + ']'));
                    }
                    else {
                        log.info(json.file +  chalk.green(' [DONE]'));
                    }
            });
        });
    }; 

    //遍历文件
    walkDir (dirPath,fn) {
        let _this=this;
        fs.readdir(dirPath, function (err, entires) {
            for (var idx in entires) {
                var fullPath = path.join(dirPath, entires[idx]);
                (function (fullPath) {
                    fs.stat(fullPath, function (err, stats) {
                        if (stats && stats.isFile()) {
                            fn&&fn(fullPath)
                        } else if(stats && stats.isDirectory()) {
                            _this.walkDir(fullPath,fn);
                        }
                    })
                })(fullPath);
            }
        });
    };

    //http上传函数
    upload(url, data, filepath, subpath, callback) {
        let formData = u.extend(data, {
            file: {
                value: fs.createReadStream(filepath),
                options: {
                    filename: subpath
                }
            }
        });
        request.post({
            url: url,
            formData: formData
        },(err, res, body)=>{
            if (err) {
                callback(err);
                return;
            }
            callback();
        })
    };

};

module.exports = HttpPush;





