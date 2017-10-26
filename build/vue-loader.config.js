module.exports = {
    loaders:{
        js:[{
            loader:'babel-loader',
            options:{
                presets: [ 'env' ],
            }
        }],
        css:'vue-style-loader!css-loader',
        sass:'vue-style-loader!css-loader!sass-loader',
    },
    extractCSS: true,
}
