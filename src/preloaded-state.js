const preloadedState = {
  entities: {
    accounts: {
      byCurrency: {
        "USD": 100.12,
        "EUR": 200.34,
        "GBP": 300.56,
        "RUB": 400.78
      },
      allCurrencies: [
        "USD", "EUR", "GBP", "RUB"
      ]
    },
    rates: {
      byCurrency: {
        "USD": 1,
        "EUR": 0.938332,
        "GBP": 0.821928,
        "RUB": 58.97305
      },
      allCurrencies: [
        "USD", "EUR", "GBP", "RUB"
      ]
    }
  },
  ui: {
    i: {
      currency: "USD"
    },
    o: {
      currency: "EUR"
    }
  }
}

export default preloadedState
