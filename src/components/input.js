import _ from "lodash"
import React from "react"
import classNames from "classnames"

import * as actions from "../actions"
import * as humanize from "../helpers/humanize"
import * as keycode from "../lib/keycode"
import libDirection from "../lib/exchange-direction"

import styles from "../styles/input.css"


class Input extends React.Component {
  constructor(props) {
    super(props)

    this.store = this.props.store
    this.unsubs = _([])

    this.state = this.mapStateToProps()

    this.onStateChange = this.onStateChange.bind(this)
    this.onOtherInputFocus = this.onOtherInputFocus.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    let u1 = this.props.store.on(
      actions.STATE_CHANGE_UI_V, this.onStateChange)
    let u2 = this.props.store.on(
      actions.STATE_CHANGE_UI_CURRENCY, this.onStateChange)
    let u3 = this.props.store.on(
      actions.STATE_UPDATE_RATES, this.onStateChange)
    let u4 = this.props.store.on(
      actions.OTHER_INPUT_FOCUS, this.onOtherInputFocus)

    this.unsubs
      .push(u1)
      .push(u2)
      .push(u3)
      .push(u4)
      .commit()
  }

  componentWillUnmount() { this.unsubs.forEach((u) => { u() }) }

  mapStateToProps() {
    return {
      v: this.store.state.getUI(this.props.direction).v,
      isSameCurrency: this.store.state.isSameCurrency()
    }
  }

  onStateChange() { this.setState(this.mapStateToProps()) }

  onOtherInputFocus(a) {
    if (a.direction !== this.props.direction) { return }
    this.el.focus()
  }

  onKeyDown(e) {
    if (e.keyCode === keycode.TAB) {
      this.store.dispatch(
        actions.uiInputFocusChange(this.props.direction))
      e.preventDefault()
    }
  }

  onChange(e) {
    this.store.dispatch(
      actions.uiInputChange(this.props.direction, e.target.value))
    e.preventDefault()
  }

  // focus+click
  onFC(e) {
    let len = e.target.value.length
    e.target.setSelectionRange(len,len)
  }

  onFocus(e) {
    this.onFC(e)
    e.preventDefault()
  }

  onBlur(e) {
    this.store.dispatch(
      actions.uiInputBlur(this.props.direction))
    e.preventDefault()
  }

  onClick(e) {
    this.onFC(e)
    e.preventDefault()
  }

  render() {
    let classes = {
      [styles.input]: true
    }

    return (
      <input type="text"
        ref={(el) => { this.el = el }}
        className={classNames(classes)}
        value={humanize.currency(this.state.v)}
        maxLength={9}
        disabled={this.state.isSameCurrency}
        autoFocus={(this.props.direction === libDirection.Input)}

        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onClick={this.onClick}
      />
    )
  }
}

export default Input
