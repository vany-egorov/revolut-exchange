import _ from "lodash"
import React from "react"

import direction from "../lib/exchange-direction"
import * as actions from "../actions"
import * as format from "../helpers/format"
import * as currency from "../lib/currency"

import styles from "../styles/header.css"


class ExchangeRate extends React.Component {
  constructor(props) {
    super(props)

    this.store = this.props.store
    this.unsubs = _([])

    this.state = this.mapStateToProps()

    this.onStateChange = this.onStateChange.bind(this)
  }

  componentDidMount() {
    let u1 = this.props.store.on(
      actions.STATE_CHANGE_UI_CURRENCY, this.onStateChange)

    this.unsubs
      .push(u1)
      .commit()
  }

  componentWillUnmount() { this.unsubs.forEach((u) => u) }

  mapStateToProps() {
    let src = this.store.state.getUI(direction.Input).currency
    let dst = this.store.state.getUI(direction.Output).currency

    return {
      v: format.round(this.store.state.rate(src, dst)),
      src: currency.parse(src),
      dst: currency.parse(dst)
    }
  }

  onStateChange() { this.setState(this.mapStateToProps()) }

  render() {
    let symbol1 = currency.symbol(this.state.src)
    let symbol2 = currency.symbol(this.state.dst)

    return (
      <div className={styles.rate}>
        {symbol1}1 = {symbol2}{this.state.v}
      </div>
    )
  }
}


export default ExchangeRate
