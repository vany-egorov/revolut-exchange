const express = require("express")
const proxy = require("http-proxy-middleware")
const webpack = require("webpack")
const http = require("http")
const socketIO = require("socket.io")
const Bacon = require("baconjs")
const {resolve} = require("path")

const {log} = require("./common/log")
const compiler = require("./tasks/webpack/compiler")()
const config = require("./config")
const webpackConfig = require("./tasks/webpack/config")
const Currencies = require("./server/entities/currencies.js")
const Rates = require("./server/entities/rates.js")

const app = express()
const router = express.Router()

// TODO: app ECB API support
const rates = new Rates(`https://openexchangerates.org/api/latest.json?app_id=${config.api.appID}`)
const currencies = new Currencies(`https://openexchangerates.org/api/currencies.json?app_id=${config.api.appID}`)

router.get("/api/v1/rates\.:ext?", (req, res) => {
  rates
    .fetch()
    .then(() => { res.send(rates.apify()) })
})

router.get("/api/v1/currencies\.:ext?", (req, res) => {
  currencies
    .fetch()
    .then(() => { res.send(currencies.apify()) })
})

app.use(router)
app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  filename: webpackConfig.output.filename,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(require("webpack-hot-middleware")(compiler, {
  log: log,
  path: config.path.hmr,
  heartbeat: config.hmr.heartbeat,
}));


const server = http.createServer(app);
const io = socketIO(server);


io.on("connection", function(socket) {
  const ticker = Bacon.fromPoll(3000, () => {
    return new Bacon.Next();
  })

  const once = new Bacon.once() // force update at startup

  const stream = ticker.merge(new Bacon.once(1))

  const unsub = stream.onValue(() => {
    return

    rates
      .fetch()
      .then(() => {
        socket.emit("rates", rates.apify())
      })
      .catch((e) => { log(e) })
  })

  socket.on("disconnect", () => { unsub() })
})


log("")
log(`development server will start at http://127.0.0.1:${config.serverLocal.port}.`)
log("")

server.listen(config.serverLocal.port)
