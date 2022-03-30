const path = require("path");
const HTMLWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "client", "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
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
        test:/\.html$/,
        use: ['html-loader']
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
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      ]
    },
    ],
  },
  plugins: [
    new HTMLWebPackPlugin({ template: "./public/index.html" }),
    new MiniCssExtractPlugin(),
  ],

  devServer: {
    proxy: {
      "/users": "http://localhost:3000",
    },
    open: false,
  },
};
