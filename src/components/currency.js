import _ from "lodash"
import React from "react"

import * as actions from "../actions"


class Currency extends React.Component {
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
    return {
      v: this.store.state.accout(this.props.direction).currency
    }
  }

  onStateChange(a) {
    if (a.direction != this.props.direction) { return }
    this.setState(this.mapStateToProps())
  }

  render() {
    return (
      <div>
        {this.state.v}
      </div>
    )
  }
}


export default Currency
