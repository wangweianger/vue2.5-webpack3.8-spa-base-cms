//webpack.base config
const webpack = require('webpack');
const path = require("path");
const fs = require("fs");
const glob = require('glob');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const vueLoaderConfig = require("./vue-loader.config");
const PROT = process.env.PROT || 8000

// 多线程
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

//提取公共文件
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
//项目名字
const projectName = "/";

//配置开始
const config = {
        entry: {
            //assets:path.resolve(__dirname, '../src' + projectName + 'assets/html/js/assets.js'),
            main:[
                `webpack-dev-server/client?http://localhost:${PROT}/`,
                "webpack/hot/dev-server",
                path.resolve(__dirname, '../src' + projectName + 'main.js')
            ]
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            publicPath: '/',
            filename: '[name].js',
            chunkFilename: "[name].js"
        },
        module: {
            rules: [{
                test: /\.vue$/,
                exclude: "/node_modules/",
                loader: [ 'happypack/loader?id=vue' ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist/,
                loader: [ 'happypack/loader?id=js' ]
            }, 
            {
                test: /\.scss$/, 
                loader: [ 'happypack/loader?id=sass' ]
            },
            {
                test:/\.css$/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: "css-loader"
                })
            },
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=img/[name].[ext]?[hash]'
            },
            {
            　　test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
            　　loader: 'url-loader?importLoaders=1&limit=1000&name=fonts/[name].[ext]'
        　　 },
            {
            　　test: /\.(xlsx|xls)(\?.*$|$)/,
            　　loader: 'url-loader?importLoaders=1&limit=8192&name=files/[name].[ext]'
        　　},
        ]},
    //自动补全识别后缀
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$:'vue/dist/vue.runtime.common.js',
            components: path.resolve(__dirname, '../src' + projectName + 'components'),
            commonvue: path.resolve(__dirname, '../src' + projectName + 'commonvue'),
            pages: path.resolve(__dirname, '../src' + projectName + 'pages'),
            common: path.resolve(__dirname, '../src' + projectName + 'assets/common'),
            assets:path.resolve(__dirname, '../src' + projectName + 'assets'),
            popup: path.resolve(__dirname, '../src' + projectName + 'assets/common/lib/popup/popup.js'),
            page: path.resolve(__dirname, '../src' + projectName + 'assets/common/lib/page/page.js'),
        },
    },
    externals: {
        jquery: 'jQuery'
    },
    //插件
    plugins: [
        //js 编译多线程 
        new HappyPack({
            id: 'js',
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'babel-loader',
                options: {
                    presets: [ 'env' ],
                }
            }],
        }),
        // sass 编译多线程
        new HappyPack({
            id: 'sass',
            threadPool: happyThreadPool,
            loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
        }),
        // vue 编译多线程
        new HappyPack({
            id: 'vue',
            threadPool: happyThreadPool,
            loaders:[{
                loader: 'vue-loader',
                options: vueLoaderConfig
            }]
        }),
        //提取css
        new ExtractTextPlugin("styles.css"),
        new CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: ['main'],
            minChunks: 1 // 提取所有entry共同依赖的模块
        }),
        //自动生成html文件
        new htmlWebpackPlugin({
            title:"首页",
            template:path.resolve(__dirname, '../src'+projectName+'index.html'),
            inject: true,
            hash: true,
            cache: true,
            chunks: ['main','vendors'],
            favicon:path.resolve(__dirname, '../favicon.ico'),
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
}

//处理所有静态html
//获得所有pages
var htmls = Object.keys(getEntry(
    path.resolve(__dirname, '../src' + projectName + 'assets/html/*.html'),
    path.resolve(__dirname, '../src' + projectName+'assets/')
));
//循环pages 自动生成html文件
htmls.forEach(function(pathname) {
    console.log(pathname)
    var pageName = pathname;
    pageName=pageName.replace('\\','/');
    var conf = {
        filename: pageName + '.html', //生成的html存放路径，相对于path
        template: path.resolve(__dirname, '../src' + projectName+ '/assets/' + pathname + '.html'),
        inject: true, //js插入的位置，true/'head'/'body'/false
        hash: true,
        cache: true,
    };
    conf.chunks = ['assets'] 
    console.log(conf)
    config.plugins.push(new htmlWebpackPlugin(conf));
});

//入口函数
function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
    entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.split(pathDir)[1].substring(1) : pathname;
        entries[pathname] = [entry];
    }
    return entries;
}

module.exports = config;
