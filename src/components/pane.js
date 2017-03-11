import React from "react"
import classNames from "classnames"

import direction from "../lib/exchange-direction"

import styles from "../styles/pane.css"


class Pane extends React.Component {
  render() {
    const classes = {
      [styles.pane]: true,
      [styles.i]: this.props.direction == direction.I,
      [styles.o]: this.props.direction == direction.O
    }

    return (
      <div className={classNames(classes)}>
        {this.props.children}
      </div>
    )
  }
}


export default Pane
