// webpack.config.js
const path = require('path')
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './dist'),
        // clean: true,
    },
    module: {
        rules: [
           {
            test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            // plugins: [
                            //     autoprefixer({
                            //         overrideBrowserslist: ['last 2 versions', '>1% ']
                            //     })
                            // ],
                        },
                    },
                ]
            },
            // 支持图片
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        // 资源输入后的名称
                        name: '[name]-[hash:8].[ext]',
                        // 资源输出的位置，相对dist目录
                        outputPath: 'images/',
                        // limit: 102400, // 10M
                    }
                }
            },
            {
                test: /\.(js|jsx|tsx)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        preset: [
                            '@babel/preset-env',
                            {
                                targets: {
                                    edge: '17',
                                    firefox: '60',
                                    chrome: '67',
                                    safari: '11.1'
                                },
                                corejs: 2, // 新版本需要制定核心库版本
                                useBUiltIns: 'usage', // 按需注入
                            }
                        ]
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'), // 设置服务器访问的基本目录
        host: 'localhost', // 服务器的ip
        port: 8080,
        open: true, // 自动打开界面,
        hot: true, // 开启热更新
        // 设置代理
        proxy: {
            '/api': {
                target: 'http://baidu.com',
                pathRewrite: {'^/api': ''}
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}