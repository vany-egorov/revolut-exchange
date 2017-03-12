import _ from "lodash"

import libDirection from "./lib/exchange-direction"
import * as format from "./helpers/format"


class State {
  constructor(initial) {
    this.entities = initial.entities
    this.ui = initial.ui
  }

  exchange() {
    let valueInput = format.round(this.ui[libDirection.Input].v)
    let valueOutput = format.round(this.ui[libDirection.Output].v)

    let accountInput = this.account(libDirection.Input)
    let accountOutput = this.account(libDirection.Output)

    accountInput.v -= valueInput
    accountOutput.v += valueOutput

    accountInput.v = format.round(accountInput.v)
    accountOutput.v = format.round(accountOutput.v)
  }

  gotOverdraft() {
    let value = format.round(this.ui[libDirection.Input].v)
    let account = this.account(libDirection.Input)
    return ((account.v - value) < 0) ? true : false
  }

  areUIVZero() {
    return (
      (format.round(this.ui[libDirection.Input].v) === 0) &&
      (format.round(this.ui[libDirection.Output].v) === 0)
    )
  }

  isSameCurrency() {
    return ((this.ui[libDirection.Input].currency)
            === (this.ui[libDirection.Output].currency))
  }

  // src => source currency
  // dst => destination currency
  rate(src, dst) {
    let s = this.entities.rates.byCurrency
    let rSrc = s[src]
    let rDst = s[dst]
    let rBase = s[this.entities.rates.base]  // 1

    return (rBase/rSrc)*rDst
  }

  updateRates(ratesNew) {
    let rates = this.entities.rates

    if (rates.timestamp === ratesNew.timestamp) { // is up to date
      return false // was no updated
    }

    rates.base = ratesNew.base
    rates.timestamp = ratesNew.timestamp
    _(rates.allCurrencies)
      .forEach((currency) => {
        rates.byCurrency[currency] = ratesNew.rates[currency]
      })

    return true
  }

  recalculateUIV() {
    let sourceDirection = this.ui.direction
    let destinationDirection = libDirection.other(sourceDirection)

    let rate = this.rate(
      this.getUI(sourceDirection).currency,
      this.getUI(destinationDirection).currency,
    )
    let v = this.getUI(sourceDirection).v
    this.getUI(destinationDirection).v = format.round(v * rate)
  }

  nxtCurrency(direction) {
    let [currencies, index] = this._nxtPrvCurrency(direction)
    return currencies[(index+1) % currencies.length]
  }

  prvCurrency(direction) {
    let [currencies, index] = this._nxtPrvCurrency(direction)
    return currencies[(index-1) < 0 ? currencies.length-1 : index-1]
  }

  account(direction) {
    let currency = this.getUI(direction).currency
    return this.entities.accounts.byCurrency[currency]
  }

  getUI(direction) {
    return this.ui[direction]
  }

  uiResetV() {
    this.ui[libDirection.Input].v = 0
    this.ui[libDirection.Output].v = 0
  }

  // private
  _nxtPrvCurrency(direction) {
    let without = this.getUI(libDirection.other(direction)).currency
    let currencies = this.entities.accounts.allCurrencies
      .filter(x => x !== without)
    let index = currencies.indexOf(this.getUI(direction).currency)
    console.log(currencies)

    return [currencies, index]
  }
}


export default State
