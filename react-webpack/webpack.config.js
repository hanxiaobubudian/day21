// webpack.config.js
const path = require('path')
const autoprefixer = require('autoprefixer');

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
            use: ['style-loader','css-loader', 'less-loader', {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        autoprefixer({
                            overrideBrowserslist: ['last 2 versions', '>1%']
                        })
                    ]
                }
            }]
           },
        ]
    }
}