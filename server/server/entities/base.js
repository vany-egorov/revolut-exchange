const request = require("request")


class Base {
  constructor(url) {
    this.url = url
  }

  fetch() {
    return new Promise((resolve, reject) => {
      let body = ""

      request
        .get(this.url)
        .on("data", (data) => {
          body += data
        })
        .on("end", () => {
          this.onBody(body)
          resolve()
        })
    })
  }
}


module.exports = Base
