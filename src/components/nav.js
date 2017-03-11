import React from "react"

import * as actions from "../actions"


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
      <div>
        <button onClick={this.onPrv}>{"<"}</button>
        <button onClick={this.onNxt}>{">"}</button>
      </div>
    )
  }
}


export default Nav
