import _ from "lodash"
import React from "react"

import * as actions from "../actions"

import styles from "../styles/input.css"


class Input extends React.Component {
  constructor(props) {
    super(props)

    this.store = this.props.store
    this.unsubs = _([])

    this.state = this.mapStateToProps()

    this.onStateChange = this.onStateChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    const u1 = this.props.store.on(
      actions.STATE_CHANGE_UI_V, this.onStateChange)

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
      v: this.store.state.getUI(this.props.direction).v
    }
  }

  onStateChange(a) {
    if (a.direction != this.props.direction) { return }
    this.setState(this.mapStateToProps())
  }

  onChange(e) {
    this.store.dispatch(
      actions.uiInputChange(this.props.direction, e.target.value))
    e.preventDefault()
  }

  onFC(e) {
    const len = e.target.value.length
    e.target.setSelectionRange(len,len)
  }

  onFocus(e) {
    this.onFC(e)
    e.preventDefault()
  }

  onClick(e) {
    this.onFC(e)
    e.preventDefault()
  }

  render() {
    return (
      <input type="text"
        className={styles.input}
        value={this.state.v}
        maxLength={7}

        onChange={this.onChange}
        onFocus={this.onFocus}
        onClick={this.onClick}
      />
    )
  }
}

export default Input
