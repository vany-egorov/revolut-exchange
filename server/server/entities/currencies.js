const request = require("request")

const Base = require("./Base")


class Currencies extends Base {
  // TODO: handle multiple data providers (APIs)
  onBody(body) {
    this.items = JSON.parse(body)
  }

  apify() {
    return JSON.stringify(this.items)
  }
}


module.exports = Currencies
