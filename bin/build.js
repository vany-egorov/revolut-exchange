#!/usr/bin/env node
const {log, error} = require("./common/log")
const {EXIT_FAILURE} = require("./common/exit-status")

const taskWebpack = require("./tasks/webpack")
const taskCp = require("./tasks/cp")


function main() {
  pipe = taskWebpack()
    .then(taskCp)

  pipe
    .then(() => {
      log("compilation OK")
    })
    .catch((err) => {
      error(`compilation error: "${err}"`)
    })
}


if (require.main === module) {
  main()
}
