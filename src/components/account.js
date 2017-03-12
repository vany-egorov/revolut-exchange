import _ from "lodash"
import React from "react"
import classNames from "classnames"

import * as actions from "../actions"
import * as currency from "../lib/currency"
import * as humanize from "../helpers/humanize"
import libDirection from "../lib/exchange-direction"

import styles from "../styles/account.css"


class Account extends React.Component {
  constructor(props) {
    super(props)

    this.store = this.props.store
    this.unsubs = _([])

    this.state = this.mapStateToProps()

    this.onStateCurrency = this.onStateCurrency.bind(this)
    this.onExchange = this.onExchange.bind(this)
    this.onStateChangeV = this.onStateChangeV.bind(this)
  }

  componentDidMount() {
    let u1 = this.props.store.on(
      actions.STATE_CHANGE_UI_CURRENCY, this.onStateCurrency)
    let u2 = this.props.store.on(
      actions.STATE_EXCHANGE, this.onExchange)
    let u3 = this.props.store.on(
      actions.STATE_CHANGE_UI_V, this.onStateChangeV)

    this.unsubs
      .push(u1)
      .push(u2)
      .push(u3)
      .commit()
  }

  componentWillUnmount() { this.unsubs.forEach((u) => { u() }) }

  mapStateToProps() {
    let account = this.store.state.account(this.props.direction)
    let gotOverdraft = false
    if (this.props.direction === libDirection.Input) {
      gotOverdraft = this.store.state.gotOverdraft()
    }
    return {
      v: account.v,
      currency: currency.parse(account.currency),
      gotOverdraft: gotOverdraft
    }
  }

  onStateCurrency(a) {
    if (a.direction !== this.props.direction) { return }

    this.setState(this.mapStateToProps())
  }

  onExchange() { this.setState(this.mapStateToProps()) }
  onStateChangeV() {
    if (this.props.direction !== libDirection.Input) { return }
    this.setState(this.mapStateToProps())
  }

  render() {
    let symbol = currency.symbol(this.state.currency)
    let classes = {
      [styles.account]: true,
      [styles["got-overdraft"]]: this.state.gotOverdraft
    }

    return (
      <div className={classNames(classes)}>
        You have {symbol}{humanize.currency(this.state.v)}
      </div>
    )
  }
}


export default Account
