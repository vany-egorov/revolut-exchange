import _ from "lodash"
import React from "react"

import * as actions from "../actions"


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
    const u1 = this.props.store.on(
      actions.STATE_CHANGE_UI_CURRENCY, this.onStateCurrency)
    const u2 = this.props.store.on(
      actions.STATE_EXCHANGE, this.onExchange)

    this.unsubs
      .push(u1)
      .push(u2)
      .commit()
  }

  componentWillUnmount() {
    this.unsubs
      .forEach((u) => { u() })
  }

  mapStateToProps() {
    const accout = this.store.state.accout(this.props.direction)
    return {
      v: accout.v,
      currency: accout.currency
    }
  }

  onStateCurrency(a) {
    if (a.direction != this.props.direction) { return }

    this.setState(this.mapStateToProps())
  }

  onExchange() { this.setState(this.mapStateToProps()) }

  render() {
    return (
      <div>
        You have {this.state.v} {this.state.currency}
      </div>
    )
  }
}


export default Account
