import React from "react"
import classNames from "classnames"

import Pane from "./pane"
import Input from "./input"
import Nav from "./nav"
import Header from "./header"
import direction from "../lib/pane-kind"

import styles from "../styles/app.css"


class App extends React.Component {
  render() {
    const classes = [
      styles.container,
      styles["container--16x9"]
    ]

    return (
      <section id="exchange" className={classNames(classes)}>
        <Header/>

        <div>
          <Pane
            direction={direction.Top}
          >
            <Input/>
            <Nav/>
          </Pane>

          <Pane
            direction={direction.Bottom}
          >
            <Input/>
            <Nav/>
          </Pane>

        </div>

      </section>
    )
  }
}


export default App
