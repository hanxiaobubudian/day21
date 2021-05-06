const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// 通过配置mode=development 或者 mode=production 来制定是开发环境打包还是生产环境打包。
	// 比如生产环境代码需要压缩，图片需要优化，webpack默认mode是生产环境，即mode=production。如果不设置会有警告
	mode: 'production', // 环境 development production
	entry: {
		// dependOn设置共享模块
		index: {
			import: './src/index.js',
			// dependOn: "shared",
		},
		// another: {
		//     import: "./src/another-module.js",
		//     dependOn: "shared",
		// },
		// shared: "lodash",
	},
	output: {
		filename: '[name]-[hash:8].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true, //  每次打包都清理dist文件
		publicPath: '/',
	},
	// optimization: {
	//     // 一个页面有多个入口时设置
	//     runtimeChunk: "single",
	//     // 将公共依赖提取到已有入口的chunk中
	//     splitChunks: {
	//         // chunks: "all",
	//         cacheGroups: {
	//             vendor: {
	//                 test: /[\\/]node_modules[\\/]/,
	//                 name: "vendors",
	//                 chunks: "all",
	//             },
	//         },
	//     },
	// },
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true,
	},
	// plugins,webpack的支柱功能，作用于webpack整个构建周期，plugin插件的目的在于结局loader无法实现的任务
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Cacaing',
		}),
	],
	// webpack是基于node.js的，项目中的任何文件都可以看成module.
	module: {
		// module.noParse    可以让webpack忽略对部分没采用模块化的文件的递归解析和处理，提高性能
		// module.rules      在处理模块时，将符合规则条件的模块，提交给对应的处理器来处理，通常用来配置loader.其类型是一个数组，数组里每一项都描述了如何去处理部分的文件
		rules: [
			// 样式
			{
				test: /\.(css|less|sass)$/i,
				use: ['style-loader', 'css-loader', 'less-loader'],
			},
			// 图片
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			// 字体
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
			// 加载数据
			{
				test: /\.(csv|tsv)$/i,
				use: ['csv-loader'],
			},
			{
				test: /\.(xml$)/i,
				use: ['xml-loader'],
			},
			// 模块转化器，用于对模块源代码进行转换
			// loader
			// {
			//     test: /\.js$/,
			//     // 将loader应用实际需要将其转换的模块
			//     include: path.resolve(__dirname, "src"),
			//     loader: "babel-loader",
			// },
			// // ts-loader
			// {
			//     test: /\.tsx$/,
			//     use: [
			//         {
			//             loader: "ts-loader",
			//             options: {
			//                 transpileOnly: true,
			//             },
			//         },
			//     ],
			// },
		],
	},
};
