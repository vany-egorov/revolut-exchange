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

  // src => source currency
  // dst => destination currency
  rate(src, dst) {
    let s = this.entities.rates.byCurrency
    let rSrc = s[src]
    let rDst = s[dst]
    let rBase = s[this.entities.rates.base]  // 1

    return (rBase/rSrc)*rDst
  }

  nxtCurrency(direction) {
    let [index, len] = this._nxtPrvCurrency(direction)
    return this.entities.accounts.allCurrencies[(index+1) % len]
  }

  prvCurrency(direction) {
    let [index, len] = this._nxtPrvCurrency(direction)
    return this.entities.accounts.allCurrencies[(index-1) < 0 ? len-1 : index-1]
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
    let c = this.getUI(direction).currency
    let index = this.entities.accounts.allCurrencies.indexOf(c)
    let len = this.entities.accounts.allCurrencies.length

    return [index, len]
  }
}


export default State
