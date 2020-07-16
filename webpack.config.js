const path=require('path');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
    entry:'./src/js/app.js',
    output:{
        filename:'js/[name].[contenthash].js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename:'index.html',
            inject:true,
            template:path.resolve(__dirname,'src','index.html')
        })
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:['babel-loader']
            },
            {
                test:/\.(png|gif|jpg|jpeg|ico|mp4)$/,
                exclude:/node_modules/,
                use:{
                    loader:'file-loader',
                    options:{
                        name:'[name].[contenthash].[ext]',
                        outputPath:'assets'
                    }
                }
            },
            {
                test:/\.html$/,
                use:['html-loader']
            }
        ]
    }
};
