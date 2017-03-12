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
      // last updated/synced-at
      timestamp: 0,
      byCurrency: {
        "USD": 1,
        "EUR": 0.926899,
        "GBP": 0.811827,
        "RUB": 59.02142
      },
      // available currencies
      // ignore other
      allCurrencies: [
        "USD", "EUR", "GBP", "RUB"
      ]
    }
  },
  ui: {
    // currently focused input
    focus: direction.Input,

    // actual exchange direction
    direction: direction.Input,

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
