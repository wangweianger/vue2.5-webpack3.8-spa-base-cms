//生产环境
const webpack = require('webpack')
const config = require('./webpack.base.config')
const path = require("path");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HttpPushWebpackPlugin = require('http-push-webpack-plugin');  //http-push
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

//项目名字
const projectName = "/";

//生成生产环境目录
config.output.path=path.resolve(__dirname, '../dist/production');
config.output.filename ='js/[name].[hash].js',
config.output.chunkFilename ="js/[name].[hash].js"

//打包api 替换
config.module.loaders=(config.module.loaders || []).concat([
  { 
    test: path.resolve(__dirname, '../src' + projectName + 'assets/common/js/config.js'),
    loader: StringReplacePlugin.replace({
      replacements: [
          {
              pattern: /127.0.0.1:8080/,
              replacement: function (match, p1, offset) {
                  return '192.168.1.10';
              }
          },
          {
              pattern: /test.cs0526.allpyra.com/,
              replacement: function (match, p1, offset) {
                  return 'www.seosiwei.com';
              }
          }
      ]})
  }
])

config.plugins = (config.plugins || []).concat([
    // 增加DllReferencePlugin配置
    new webpack.DllReferencePlugin({
        context:path.join(__dirname, '../dist/production/libs'), 
        manifest: require("../dist/production/libs/vendor-manifest.json")
    }),
    // 清除上一次生成的文件
    new CleanWebpackPlugin(['production/js'], {
        root: path.resolve(__dirname, '../dist'),
        verbose: true,
        dry: false,
    }),
    // 多线程压缩
    new ParallelUglifyPlugin({
        // 支持es6打包
        uglifyES: {
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }
    }),
    //string替换
    new StringReplacePlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
])

// webpack http-push 上传
if(process.env.HTTP_PUSH === 'http-push' ){
    config.plugins = (config.plugins || []).concat([
        new HttpPushWebpackPlugin({
            receiver: 'http://127.0.0.1:1234/receiver', // 服务端文件上传接口
            token: '../html/wangwei', // 验证token
            to: '../html/wangwei', // 注意这个是指的是测试机器的路径，而非本地机器
        }),
    ])
};



module.exports = config







