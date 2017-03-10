import React from "react"
import classNames from "classnames"

import CurrencyPane from "./currency-pane"
import direction from "./currency-pane-direction"

import styles from "../styles/app.css"


class App extends React.Component {
  render() {
    const classes = [
      styles.container,
      styles["container--16x9"]
    ]

    return (
      <section id="exchange" className={classNames(classes)}>
        <CurrencyPane
          direction={direction.Top}
        />
        <CurrencyPane
          direction={direction.Bottom}
        />
      </section>
    )
  }
}


export default App
