const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/** @type {import('webpack').Configuration} **/
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  entry: ["./src/index.tsx"],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devServer: {
    hot: true,
    port: 3000,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "public", "index.html"),
      serveIndex: true,
      watch: true,
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: ".",
          filter: (name) => {
            return !name.endsWith("index.html");
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      filename: "index.html",
    }),
  ],
};
