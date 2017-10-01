"use strict"
const path = require("path")
module.exports = {
  devServer: {
    contentBase: "./target",
    watchContentBase: true,
    port: 9000,
    open: true,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  devtool: "source-map",
  entry: "./src/browser/index.js",
  output: {
    path: path.resolve("./target/"),
    filename: "bundle.js",
  },
  resolve: {},
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
}
