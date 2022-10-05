React* in frontend con django

npm init -y
npm i webpack webpack-cli --save-dev
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
npm i react react-dom --save-dev

//crear
src/index.js-components
static/frontend-css.index.css-images
template/frontend

//crear
babel.config.json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets":{
                    "node": "10"
                }
            }
        ],
        "@babel/preset-react"
    ]
}

webpack.config.js
{
    const path = require("path");
    const webpack = require("webpack");

    module.exports = {
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "./static/frontend"),
            filename: "[name].js",
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
            ],
        },
        optimization: {
            minimize: true,
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    // This has effect on the react lib size
                    // NODE_ENV: JSON.stringify("production"),
                    NODE_ENV: JSON.stringify("development"),
                },
            }),
        ],
        stats: {
        errorDetails: true,
        //    children: true
        },
    };
}