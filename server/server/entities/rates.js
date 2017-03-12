const request = require("request")

const Base = require("./Base")


function randomBetween(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(6))
}


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

  apifyRandom() {
    return JSON.stringify({
      "timestamp": Math.floor(Date.now() / 1000), // unix timestamp
      "base": "USD",
      "rates": {
        "USD": 1,
        "EUR": randomBetween(0.9, 1.1),
        "GBP": randomBetween(0.7, 0.9),
        "RUB": randomBetween(30, 200) // :(
      }
    })
  }
}


module.exports = Rates