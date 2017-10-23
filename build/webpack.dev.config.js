// //开发环境
const webpack = require('webpack')
const config = require('./webpack.base.config')
const WebpackDevServer = require('webpack-dev-server')
const compiler = webpack(config);
const PROT = process.env.HTTP_PUSH || 8000

const server = new WebpackDevServer(compiler, {
    hot: true,
    inline: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    historyApiFallback:{
        index:'/index.html' 
    },
    stats: { 
        colors: true 
    },
    proxy: {
        '/api': {
            target: 'https://other-server.example.com',
            secure: false
        }
    }
});

server.listen(PROT);

console.log(`服务端启动的链接地址为：http://127.0.0.1:${PROT}`);
