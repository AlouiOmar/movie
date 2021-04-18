const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const port = process.env.PORT || 3000;

module.exports = {
  mode: "development",
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + "/dist/assets",
    filename: "bundle.js",
    publicPath: "assets",
  },

  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.obj$/,

        // CHANGE HERE
        loader: "url-loader",

        include: path.obj,
      },
      {
        test: /\.mtl$/,

        // CHANGE HERE
        loader: "url-loader",

        include: path.mtl,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },

          {
            loader: "css-loader",
            options: {
              modules: true,
              localsConvention: "camelCase",
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),
  ],
  devServer: {
    host: "localhost",
    port: port,
    historyApiFallback: true,
    open: true,
  },
};
/* var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: ["./app"],
  output: {
    path: "dist",
    publicPath: "/assets/",
    filename: "bundle.js",
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ["url?limit=8192", "img"],
      },
      {
        test: /\.obj$/,

        // CHANGE HERE
        loader: "url-loader",

        include: paths.obj,
      },
      {
        test: /\.mtl$/,

        // CHANGE HERE
        loader: "url-loader",

        include: paths.mtl,
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract(
          "style",
          "css!autoprefixer?browsers=last 3 versions!sass"
        ),
      },
      {
        test: /\.woff2$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff2",
      },
      {
        test: /\.woff$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.ttf$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream",
      },
      { test: /\.eot$/, loader: "file-loader" },
      {
        test: /\.svg$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml",
      },
    ],
  },
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  plugins: [
    new ExtractTextPlugin("app.css", {
      allChunks: true,
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.dev.assetsSubDirectory,
        ignore: [".*"],
      },
    ]),
  ],
};
 */
