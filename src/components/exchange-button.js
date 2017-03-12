import _ from "lodash"
import React from "react"

import * as actions from "../actions"

import styles from "../styles/header.css"


class ExchangeButton extends React.Component {
  constructor(props) {
    super(props)

    this.store = this.props.store
    this.unsubs = _([])

    this.state = this.mapStateToProps()

    this.onClick = this.onClick.bind(this)
    this.onStateChange = this.onStateChange.bind(this)
  }

  componentDidMount() {
    let u1 = this.props.store.on(
      actions.STATE_CHANGE_UI_V, this.onStateChange)
    let u2 = this.props.store.on(
      actions.STATE_CHANGE_CURRENCY, this.onStateChange)

    this.unsubs
      .push(u1)
      .push(u2)
      .commit()
  }

  componentWillUnmount() { this.unsubs.forEach((u) => { u() }) }

  mapStateToProps() {
    return {
      "disabled": (
        this.store.state.gotOverdraft() ||
        this.store.state.areUIVZero()
      )
    }
  }

  onStateChange() { this.setState(this.mapStateToProps()) }

  onClick(e) {
    this.props.store.dispatch(actions.uiExchange())
    e.preventDefault()
  }

  render() {
    return (
      <button
        className={styles.button}
        onClick={this.onClick}
        disabled={this.state.disabled}
      >
        Exchange
      </button>
    )
  }
}


export default ExchangeButton
