const request = require("request")

const Base = require("./Base")


class Rates extends Base {
  // TODO: handle multiple data providers (APIs)
  onBody(body) {
    let items = JSON.parse(body)

    delete items.disclaimer
    delete items.license

    this.items = items
  }

  apify() {
    return JSON.stringify(this.items)
  }
}


module.exports = Rates
