import React from "react"

import * as actions from "../actions"

import styles from "../styles/nav.css"


class Nav extends React.Component {
  constructor(props) {
    super(props)

    this.store = this.props.store

    this.onPrv = this.onPrv.bind(this)
    this.onNxt = this.onNxt.bind(this)
  }

  onPrv(e) {
    this.store.dispatch(actions.uiPrv(this.props.direction))
    e.preventDefault()
  }

  onNxt(e) {
    this.store.dispatch(actions.uiNxt(this.props.direction))
    e.preventDefault()
  }

  render() {
    return (
      <div className={styles.bar}>
        <button onClick={this.onPrv} className={styles.btn}>{"<"}</button>
        <button onClick={this.onNxt} className={styles.btn}>{">"}</button>
      </div>
    )
  }
}


export default Nav
