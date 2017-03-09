const debug = require("debug")("va")


module.exports = {
  "log": console.log,
  "logDebug": debug,
  "debug": debug,
  "logError": console.error,
  "error": console.error,
}
