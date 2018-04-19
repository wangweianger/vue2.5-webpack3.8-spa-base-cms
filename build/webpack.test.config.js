//生产环境
var webpack = require('webpack')
var config = require('./webpack.base.config')
var path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

//项目名字
var projectName = "/";

//生成测试环境目录
config.output.path=path.resolve(__dirname, '../dist/test');
config.output.filename ='js/[name].js',
config.output.chunkFilename ="js/[name].js"

// loaders
config.module.rules = (config.module.rules || []).concat([{
        // index.html script脚本引入
        test: path.resolve(__dirname, '../src' + projectName + 'index.html'),
        loader: 'webpack-dll-loader',
        exclude: "/node_modules/",
        options:{
            publicPath:'/libs/',
            manifest:path.resolve(__dirname, '../dist' + projectName + 'test/libs/libs-manifest.json')
        }
    },{
        //打包字符串替换
        test: path.resolve(__dirname, '../src/assets/common/js/configs.js'),
        loader: 'string-replace-loader',
        exclude: "/node_modules/",
        query: {
            multiple: [
                { search: /123456/, replace: '987654321' },
            ]
        }
    }])

config.devtool = '#source-map';
// 插件
config.plugins = (config.plugins || []).concat([
    // 增加DllReferencePlugin配置
    new webpack.DllReferencePlugin({
        context:path.join(__dirname, '../dist/test/libs'), 
        manifest: require("../dist/test/libs/libs-manifest.json")
    }),
    // 清除上一次生成的文件
    new CleanWebpackPlugin(['test/js'], {
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
])


module.exports = config





