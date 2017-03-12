import _ from "lodash"
import React from "react"
import classNames from "classnames"

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

  componentWillUnmount() { this.unsubs.forEach((u) => { u() }) }

  mapStateToProps() {
    let source = this.store.state.getUI(direction.Input).currency
    let destination = this.store.state.getUI(direction.Output).currency

    return {
      v: format.round(this.store.state.rate(source, destination)),
      source: currency.parse(source),
      destination: currency.parse(destination),
      isSameCurrency: this.store.state.isSameCurrency()
    }
  }

  onStateChange() { this.setState(this.mapStateToProps()) }

  render() {
    let symbol1 = currency.symbol(this.state.source)
    let symbol2 = currency.symbol(this.state.destination)

    let classes = {
      [styles["rate"]]: true,
      [styles["rate--hidden"]]: this.state.isSameCurrency
    }

    return (
      <div className={classNames(classes)}>
        {symbol1}1 = {symbol2}{this.state.v}
      </div>
    )
  }
}


export default ExchangeRate
