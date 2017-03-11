import React from "react"

import * as actions from "../actions"

import styles from "../styles/nav.css"


class Nav extends React.Component {
  constructor(props) {
    super(props)

    this.store = this.props.store

    this.onPrevious = this.onPrevious.bind(this)
    this.onNext = this.onNext.bind(this)
  }

  onPrevious(e) {
    this.store.dispatch(actions.uiPrevious(this.props.direction))
    e.preventDefault()
  }

  onNext(e) {
    this.store.dispatch(actions.uiNext(this.props.direction))
    e.preventDefault()
  }

  render() {
    return (
      <div className={styles.bar}>
        <button onClick={this.onPrevious} className={styles.btn}>{"<"}</button>
        <button onClick={this.onNext} className={styles.btn}>{">"}</button>
      </div>
    )
  }
}


export default Nav
