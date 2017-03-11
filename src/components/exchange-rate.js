import _ from "lodash"
import React from "react"

import direction from "../lib/exchange-direction"
import * as format from "../helpers/format"
import * as actions from "../actions"


class ExchangeRate extends React.Component {
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
      v: format.round(this.store.state.rate(src, dst)),
      src: src,
      dst: dst
    }
  }

  onStateChange() { this.setState(this.mapStateToProps()) }

  render() {
    return (
      <div>
        <b>1 {this.state.src} = {this.state.v} {this.state.dst}</b>
      </div>
    )
  }
}


export default ExchangeRate
