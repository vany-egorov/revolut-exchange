import React from "react"
import classNames from "classnames"

import Header from "./header"
import ExchangeRate from "./exchange-rate"
import ExchangeButton from "./exchange-button"
import Pane from "./pane"
import Currency from "./currency"
import Account from "./account"
import Input from "./input"
import Nav from "./nav"
import direction from "../lib/exchange-direction"

import styles from "../styles/app.css"
import stylesPane from "../styles/pane.css"


class App extends React.Component {
  render() {
    const classes = [
      styles.container,
      styles["container--16x9"]
    ]

    console.log(stylesPane)

    return (
      <section className={classNames(classes)}>

        <Pane
          direction={direction.I}
        >
          <Header>
            <ExchangeRate store={this.props.store}/>
            <ExchangeButton store={this.props.store}/>
          </Header>

          <div className={classNames(stylesPane.l)}>
            <Currency store={this.props.store} direction={direction.I}/>
            <Account store={this.props.store} direction={direction.I}/>
          </div>
          <div className={classNames(stylesPane.r)}>
            <Input store={this.props.store} direction={direction.I}/>
          </div>
          <div className={stylesPane.clear}/>

          <Nav store={this.props.store} direction={direction.I}/>
        </Pane>

        <Pane
          direction={direction.O}
        >
          <div className={stylesPane.l}>
            <Account store={this.props.store} direction={direction.O}/>
            <Currency store={this.props.store} direction={direction.O}/>
          </div>
          <div className={stylesPane.r}>
            <Input store={this.props.store} direction={direction.O}/>
          </div>
          <div className={stylesPane.clear}/>

          <Nav store={this.props.store} direction={direction.O}/>
        </Pane>

      </section>
    )
  }
}


export default App
