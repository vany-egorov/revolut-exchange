const express = require("express")
const proxy = require("http-proxy-middleware")
const webpack = require("webpack")
const http = require("http")
const socketIO = require("socket.io")
const Bacon = require("baconjs")

const {log} = require("./common/log")
const compiler = require("./tasks/webpack/compiler")()
const config = require("./config")
const webpackConfig = require("./tasks/webpack/config")
const Currencies = require("./server/entities/currencies.js")
const Rates = require("./server/entities/rates.js")

const app = express()
const router = express.Router()

router.get("/", (req, res) => {
  res.sendFile(config.path.indexHtml)
})

const rates = new Rates("https://openexchangerates.org/api/latest.json?app_id=0421e1c208094556b8a11f2badebc230")
const currencies = new Currencies("https://openexchangerates.org/api/currencies.json?app_id=0421e1c208094556b8a11f2badebc230")

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
    publicPath: "/static"
}));
app.use(require("webpack-hot-middleware")(compiler, {
  log: log,
  path: config.path.hmr,
  heartbeat: config.hmr.heartbeat,
}));


const server = http.createServer(app);
const io = socketIO(server);


io.on("connection", function(socket) {
  console.log("[+]")

  const ticker = Bacon.fromPoll(3000, () => {
    return new Bacon.Next();
  })

  const once = new Bacon.once() // force update at startup

  const stream = ticker.merge(new Bacon.once(1))

  const unsub = stream.onValue(() => {
    rates
      .fetch()
      .then(() => {
        socket.emit("rates", rates.apify())
      })
  })

  socket.on("disconnect", () => { unsub() })
})


log("")
log(`development server will start at http://127.0.0.1:${config.serverLocal.port}.`)
log("")

server.listen(config.serverLocal.port)
