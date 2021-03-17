const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    // dependOn设置共享模块
    index: {
      import: "./src/index.js"
      // dependOn: "shared",
    }
    // another: {
    //     import: "./src/another-module.js",
    //     dependOn: "shared",
    // },
    // shared: "lodash",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true, //  每次打包都清理dist文件
    publicPath: "/"
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
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: "Cacaing"
    })
  ],
  module: {
    rules: [
      // 样式
      // {
      //     test: /\.(css|less|sass)$/i,
      //     use: ["style-loader", "css-loader"],
      // },
      // 图片
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      },
      // 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource"
      },
      // 加载数据
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"]
      },
      {
        test: /\.(xml$)/i,
        use: ["xml-loader"]
      }
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
    ]
  }
};
