
var HttpPush=require('./http.push.js')
var pushType=process.env.HTTP_PUSH

//集成环境发布方式
if(pushType=='build'){
   new HttpPush({
        receiver: 'http://127.0.0.1:1234/receiver',
        buildDir:'./dist/production',
        to:'../html/wangwei',
        data:{
            token:'../html/wangwei',
        },
    }) 
};
 







