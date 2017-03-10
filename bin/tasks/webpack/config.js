const {resolve} = require("path")
const webpack = require("webpack")
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
// const ClosureCompilerPlugin = require("webpack-closure-compiler")
const CompressionPlugin = require("compression-webpack-plugin")
const config = require("../../config")
const env = require("../../common/env")

const webpackConfig = {
  devtool: "source-map",
  stats: {
    colors: true,
    reasons: false
  },
  output: {
    path: resolve("static"),
    publicPath: "/",
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "eslint-loader",
            options: {
              configFile: resolve(".eslintrc")
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      "__DEV__": env.isDev(config.env),
      "__PROD__": env.isProd(config.env),
      "__SERVER__": `127.0.0.1:${config.serverLocal.port}`,
    }),
  ]
}

// entry
const entryMain = resolve("src/main.js")
// The script refreshing the browser on none hot updates
const entryHMR = "webpack-hot-middleware/client?reload=true&overlay=true"
if (env.isDev(config.env)) {
  webpackConfig.entry = [entryMain, entryHMR]
} else if (env.isProd(config.env)) {
  webpackConfig.entry = [entryMain]
}

// plugins
if (env.isDev(config.env)) {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else if (env.isProd(config.env)) {
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),

    // WARNING in DedupePlugin:
    // This plugin was removed from webpack. remove it from configuration.
    //
    // new webpack.optimize.DedupePlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      },
      comments: false,
      sourceMap: false
    }),

    // new ClosureCompilerPlugin({
    //   compiler: {
    //     compilation_level: "ADVANCED"
    //   },
    //   concurrency: 3,
    // })

    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
