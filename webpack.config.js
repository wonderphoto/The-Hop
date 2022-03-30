const path = require("path");
const HTMLWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');

// on solving react router can't refresh error /can't get url other than home
// https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
// https://ui.dev/react-router-cannot-get-url-refresh

module.exports = {
  entry: path.resolve(__dirname, "src", "client", "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: "/node_modules/",
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|png|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
              publicPath: "img/",
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebPackPlugin({ template: "./public/index.html" }),
    new MiniCssExtractPlugin(),
    new Dotenv()
  ],

  devServer: {
    static: {
      directory: path.resolve(__dirname, "build"),
      publicPath: "/build",
    },
    historyApiFallback: true,
    compress: true,
    proxy: {
      "/users": "http://localhost:3000",
    },
    open: false,
  },
};
