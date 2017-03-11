import _ from "lodash"
import React from "react"

import direction from "../lib/exchange-direction"
import * as actions from "../actions"
import * as format from "../helpers/format"
import * as currency from "../lib/currency"

import styles from "../styles/pane.css"


class ExchangeRateInvert extends React.Component {
  constructor(props) {
    super(props)

    this.store = this.props.store
    this.unsubs = _([])

    this.state = this.mapStateToProps()

    this.onStateChange = this.onStateChange.bind(this)
  }

  componentDidMount() {
    const u1 = this.props.store.on(
      actions.STATE_CHANGE_UI_CURRENCY, this.onStateChange)

    this.unsubs
      .push(u1)
      .commit()
  }

  componentWillUnmount() {
    this.unsubs
      .forEach((u) => { u() })
  }

  mapStateToProps() {
    const src = this.store.state.getUI(direction.I).currency
    const dst = this.store.state.getUI(direction.O).currency

    return {
      v: format.round(this.store.state.rate(dst, src)),
      src: currency.parse(dst),
      dst: currency.parse(src)
    }
  }

  onStateChange() { this.setState(this.mapStateToProps()) }

  render() {
    const symbol1 = currency.symbol(this.state.dst)
    const symbol2 = currency.symbol(this.state.src)

    return (
      <div className={styles["rate-invert"]}>
        {symbol1}1 = {symbol2}{this.state.v}
      </div>
    )
  }
}


export default ExchangeRateInvert
