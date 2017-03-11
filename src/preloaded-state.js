import direction from "./lib/exchange-direction"


let preloadedState = {
  entities: {
    accounts: {
      byCurrency: {
        "USD": {
          v: 100.12,
          currency: "USD"
        },
        "EUR": {
          v: 200.34,
          currency: "EUR"
        },
        "GBP": {
          v: 300.56,
          currency: "GBP"
        },
        "RUB": {
          v: 400.78,
          currency: "RUB"
        }
      },
      allCurrencies: [
        "USD", "EUR", "GBP", "RUB"
      ]
    },
    rates: {
      base: "USD",
      byCurrency: {
        "USD": 1,
        "EUR": 0.936899,
        "GBP": 0.821827,
        "RUB": 59.02142
      },
      allCurrencies: [
        "USD", "EUR", "GBP", "RUB"
      ]
    }
  },
  ui: {
    [direction.Input]: {
      currency: "USD",
      v: 0
    },
    [direction.Output]: {
      currency: "EUR",
      v: 0
    }
  }
}

export default preloadedState
