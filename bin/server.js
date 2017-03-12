const express = require("express")
const webpack = require("webpack")
const http = require("http")
const socketIO = require("socket.io")
const Bacon = require("baconjs")
const {resolve} = require("path")

const {log} = require("../server/common/log")
const compiler = require("../server/tasks/webpack/compiler")()
const config = require("../server/config")
const webpackConfig = require("../server/tasks/webpack/config")
const Currencies = require("../server/server/entities/currencies.js")
const Rates = require("../server/server/entities/rates.js")

const app = express()
const router = express.Router()

// TODO: app ECB API support
const rates = new Rates(`https://openexchangerates.org/api/latest.json?app_id=${config.api.appID}`)
const currencies = new Currencies(`https://openexchangerates.org/api/currencies.json?app_id=${config.api.appID}`)

router.get("/api/v1/rates\.:ext?", (req, res) => {
  if (config.api.randomize) {
    res.send(rates.apifyRandom())
  } else {
    rates
      .fetch()
      .then(() => { res.send(rates.apify()) })
  }
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
  const ticker = Bacon.fromPoll(
    config.api.pollPeriod * 1000, () => {
      return new Bacon.Next();
    }
  )

  // force update at startup
  const once = new Bacon.once()

  const stream = ticker.merge(new Bacon.once(1))

  const unsub = stream.onValue(() => {
    if (config.api.randomize) {
      socket.emit("rates", rates.apifyRandom())
    } else {
      rates
        .fetch()
        .then(() => {
          socket.emit("rates", rates.apify())
        })
        .catch((e) => { log(e) })
    }
  })

  socket.on("disconnect", () => { unsub() })
})


log("")
log(`development server will start at http://127.0.0.1:${config.serverLocal.port}.`)
log("")

server.listen(config.serverLocal.port)
