/**
 * @author wangwei
 * @since 17/4/1
 */

var httpPushTarGz=require('./http.push.js')
var path = require('path');

/*--------------发布代码配置-------------------*/
new httpPushTarGz({
    receiver  : 'http://www.xxx.cn/http-push-test/receiver',
    distDir   : path.resolve(__dirname, '../dist/targz'),  //生成tar.gz包的文件夹
    proDir    : path.resolve(__dirname, '../dist/production'), //上传的目标文件夹
    copyDir   : path.resolve(__dirname, '../dist/html'), //复制的目标文件夹
    tarGzName : 'build.tar.gz', //压缩后的名字
    to        : '/data/app/pt/html/html',  //服务器 放置目录
    data:{
        isDelDir  : 'yes',  //是否删除服务端文件   no || yes
        exclude   : '',   //服务器不需要删除的文件夹
    }
});
