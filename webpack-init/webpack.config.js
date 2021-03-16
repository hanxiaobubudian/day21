const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    print: "./src/print.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, //  每次打包都清理dist文件
    publicPath: "/"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist"
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development"
    })
  ],
  module: {
    rules: [
      // 样式
      {
        test: /\.(css|less|sass)$/i,
        use: ["style-loader", "css-loader"]
      },
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
    ]
  }
};
