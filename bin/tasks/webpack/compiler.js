const webpack = require("webpack")
const webpackConfig = require("./config")


function compiler() {
  return webpack(webpackConfig)
}


module.exports = compiler
