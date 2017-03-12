#!/usr/bin/env node
const {log, error} = require("../server/common/log")
const taskWebpack = require("../server/tasks/webpack")
const taskCp = require("../server/tasks/cp")


function main() {
  pipe = taskWebpack()
    .then(taskCp)

  pipe
    .then(() => {
      log("OK")
    })
    .catch((err) => {
      error(`error: "${err}"`)
    })
}


if (require.main === module) {
  main()
}
