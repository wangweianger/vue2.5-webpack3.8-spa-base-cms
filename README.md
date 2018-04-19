# vue组件化开发-示例  vue2.5+webpack3.8

>  * 使用知识点：
>  * vue.js           轻量级mvvm框架
>  * webpack          前端自动话打包工具
>  * vue-router       vue路由
>  * vue-loader       vue组件化开发插件
>  * vuex             前端状态管理 类式于flux 和 radux
>  * babel            es6转译工具，用最前言的javascript做前端开发


## 优化说明
>  * DllPlugin和DllReferencePlugin  项目中不更改js不需要重复构建 例如：vue,vuex,vue-router 等等
     参考配置： webpack.dll.config.js
>  * happypack 优化 针对于.vue、.js、.scss 文件进行多线程编译
>  * webpack-parallel-uglify-plugin  插件替换 webpack 自带的UglifyJS 插件  支持打包es6语法
>  * Webpack 3 的新功能：Scope Hoisting 新增配置插件  new webpack.optimize.ModuleConcatenationPlugin()

### 优化之后构建速度明显提高

### webpack优化构建说明：http://blog.seosiwei.com/detail/9

## 项目步骤

1.安装node.js

2.安装项目依赖包

```
npm install
```

3.运行开发环境

```
npm run dev 
```

```
浏览器中访问：localhost:8000
```


4.打包生产文件  打生产报需要构建一次 dll 命令：即经常不会改动的文件

```
npm run build:dll   //此命令一般只运行一次 若后期依赖项目有改动才运行

npm run build  //每次生产包运行

``` 

##大致说明

```
webpack : 前端模块化打包工具
vue.js  : vue.js  清量级的mvvm的框架
babel   : 项目使用babel编译 可用最新的es6编写我们的javascript （当然用es5写也是一样的）
vue-loader ：模块化的开发vue插件
vue-router ：vue的路由插件
vuex  :  一个专门为 Vue.js 应用设计的状态管理架构
```

### DEMO图片
![](https://github.com/wangweianger/vue2.5-webpack3.8-spa-base-cms/blob/master/imgs/01.png "")
