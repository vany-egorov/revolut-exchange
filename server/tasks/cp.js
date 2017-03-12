const fs = require("fs-extra")

const {log} = require("../common/log")
const config = require("../config")


function task() {
  return new Promise((resolve, reject) => {
    log(`cp -r ${config.path.static} ${config.path.dist}`)

    fs.copySync(config.path.static, config.path.dist)

    resolve()
  })
}


module.exports = task
