import React from "react"

import * as actions from "../actions"


class ExchangeButton extends React.Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    this.props.store.dispatch(actions.uiExchange())
    e.preventDefault()
  }

  render() {
    return (
      <button onClick={this.onClick}>
        Exchange
      </button>
    )
  }
}


export default ExchangeButton
