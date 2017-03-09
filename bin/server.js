const express = require("express")
const proxy = require("http-proxy-middleware")
const webpack = require("webpack")
const {log} = require("./common/log")
const compiler = require("./tasks/webpack/compiler")()
const config = require("./config")
const webpackConfig = require("./tasks/webpack/config")

const app = express()
const router = express.Router()

router.get("/", (req, res) => { res.sendFile(config.path.indexHtml) })

log("")
log(`development server will start at http://127.0.0.1:${config.serverLocal.port}.`)
log("")

app.use(router)
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: "/static"
}));
app.use(require("webpack-hot-middleware")(compiler, {
  log: log,
  path: config.path.hmr,
  heartbeat: config.hmr.heartbeat,
}));

const server = app.listen(config.serverLocal.port)
