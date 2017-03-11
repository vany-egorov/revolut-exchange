import React from "react"

import * as actions from "../actions"

import styles from "../styles/header.css"


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
      <button
        className={styles.button}
        onClick={this.onClick}
      >
        Exchange
      </button>
    )
  }
}


export default ExchangeButton
