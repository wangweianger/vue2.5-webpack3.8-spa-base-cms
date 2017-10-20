module.exports = {
    "loaders": {
        "css": ["vue-style-loader", {
            "loader": "css-loader",
            "options": {
                "minimize": false,
                "sourceMap": false
            }
        }],
        "sass": ["vue-style-loader", {
            "loader": "css-loader",
            "options": {
                "minimize": false,
                "sourceMap": false
            }
        }, {
            "loader": "sass-loader",
            "options": {
                "sourceMap": false
            }
        }],
    }
}