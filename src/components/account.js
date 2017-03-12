import _ from "lodash"
import React from "react"

import * as actions from "../actions"
import * as currency from "../lib/currency"

import styles from "../styles/account.css"


class Account extends React.Component {
  constructor(props) {
    super(props)

    this.store = this.props.store
    this.unsubs = _([])

    this.state = this.mapStateToProps()

    this.onStateCurrency = this.onStateCurrency.bind(this)
    this.onExchange = this.onExchange.bind(this)
  }

  componentDidMount() {
    let u1 = this.props.store.on(
      actions.STATE_CHANGE_UI_CURRENCY, this.onStateCurrency)
    let u2 = this.props.store.on(
      actions.STATE_EXCHANGE, this.onExchange)

    this.unsubs
      .push(u1)
      .push(u2)
      .commit()
  }

  componentWillUnmount() { this.unsubs.forEach((u) => { u() }) }

  mapStateToProps() {
    let account = this.store.state.account(this.props.direction)
    return {
      v: account.v,
      currency: currency.parse(account.currency)
    }
  }

  onStateCurrency(a) {
    if (a.direction != this.props.direction) { return }

    this.setState(this.mapStateToProps())
  }

  onExchange() { this.setState(this.mapStateToProps()) }

  render() {
    let symbol = currency.symbol(this.state.currency)

    return (
      <div className={styles.account}>
        You have {symbol}{this.state.v}
      </div>
    )
  }
}


export default Account
