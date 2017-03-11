import direction from "./lib/exchange-direction"


class State {
  constructor(initial) {
    this.entities = initial.entities
    this.ui = initial.ui
  }

  // src => source currency
  // dst => destination currency
  rate(src, dst) {
    const s = this.entities.rates.byCurrency
    const rSrc = s[src]
    const rDst = s[dst]
    const rBase = s[this.entities.rates.base]  // 1

    return (rBase/rSrc)*rDst
  }

  nxtCurrency(drc) {
    const [index, len] = this._nxtPrvCurrency(drc)
    return this.entities.accounts.allCurrencies[(index+1) % len]
  }

  prvCurrency(drc) {
    const [index, len] = this._nxtPrvCurrency(drc)
    return this.entities.accounts.allCurrencies[(index-1) < 0 ? len-1 : index-1]
  }

  accout(drc) {
    const currency = this.getUI(drc).currency
    return this.entities.accounts.byCurrency[currency]
  }

  getUI(drc) {
    return this.ui[drc]
  }

  uiResetV() {
    this.ui[direction.I].v = 0
    this.ui[direction.O].v = 0
  }

  // private
  _nxtPrvCurrency(drc) {
    const c = this.getUI(drc).currency
    const index = this.entities.accounts.allCurrencies.indexOf(c)
    const len = this.entities.accounts.allCurrencies.length

    return [index, len]
  }
}


export default State
