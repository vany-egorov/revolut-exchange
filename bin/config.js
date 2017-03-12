/*
 * global development! configuration file
 * production configuration comes from production server
*/
const {resolve} = require("path")
const env = require("./common/env")
const {log} = require("./common/log")
const apiKind = require("./common/api-kind")

const config = {
  env: env.parse(process.env.UI_ENV || "development"),

  path: {
    indexHtml: resolve("bin", "html", "index.html"),
    static: resolve("static"),
    dist: resolve("dist"),
    favicon: resolve("static", "favicon.png"),
    hmr: "/__webpack_hmr",
  },

  api: {
    kind: apiKind.OpenExchange,
    appID: "0421e1c208094556b8a11f2badebc230",
  },

  hmr: {
    heartbeat: 10 * 1000,
  },

  // nodejs/express local server settings
  serverLocal: {
    port: process.env.UI_PORT || 1024,
  }
}

function toLog(v) {
  const p = "  "  /* prefix */

  log("")
  log("application config:")
  log("")
  log(`${p}env: "${env.toString(v.env)}"`)

  log(`${p}path(various paths):`)
  log(`${p}  index-html: "${v.path.indexHtml}"`)
  log(`${p}  favicon: "${v.path.favicon}"`)
  log(`${p}  dist: "${v.path.dist}"`)
  log(`${p}  static: "${v.path.static}"`)
  log(`${p}  hmr: "${v.path.hmr}"`)

  log(`${p}hmr:`)
  log(`${p}  heartbeat: ${v.hmr.heartbeat}`)

  log(`${p}api(remote exchange API):`)
  log(`${p}  kind: "${apiKind.name(v.api.kind)}"`)
  log(`${p}  appID: "${v.api.appID}"`)

  log(`${p}server-local(nodejs/express local server settings):`)
  log(`${p}  host: 0.0.0.0`)
  log(`${p}  port: ${v.serverLocal.port}`)
  log("")
}

toLog(config)

module.exports = config
