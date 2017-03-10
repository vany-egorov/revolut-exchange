import React from "react"
import classNames from "classnames"

import Pane from "./pane"
import Input from "./input"
import Nav from "./nav"
import Header from "./header"
import direction from "../lib/exchange-direction"

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
            direction={direction.I}
          >
            <Input direction={direction.I}/>
            <Nav/>
          </Pane>

          <Pane
            direction={direction.O}
          >
            <Input direction={direction.O}/>
            <Nav/>
          </Pane>

        </div>

      </section>
    )
  }
}


export default App
