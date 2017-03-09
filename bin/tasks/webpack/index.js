const compiler = require("./compiler")
const {log, error} = require("../../common/log")

function task() {
  return new Promise((resolve, reject) => {
    compiler().run((err, stats) => {
      if (err) {
        error(err.stack || err);
        if (err.details) {
          error(err.details);
        }
        return;
      }

      log(stats.toString({
        chunks: false,  // less verbose
        colors: true,   // allow colors
      }))

      resolve()
    })
  })
}

module.exports = task
