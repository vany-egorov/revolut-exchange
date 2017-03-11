import React from "react"
import classNames from "classnames"

import Header from "./header"
import ExchangeRate from "./exchange-rate"
import ExchangeRateInvert from "./exchange-rate-invert"
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
    let classes = [
      styles.container,
      styles["container--16x9"]
    ]

    return (
      <section className={classNames(classes)}>

        <Pane
          direction={direction.Input}
        >
          <Header>
            <ExchangeRate store={this.props.store}/>
            <ExchangeButton store={this.props.store}/>
          </Header>

          <div className={classNames(stylesPane.l)}>
            <Currency store={this.props.store} direction={direction.Input}/>
            <Account store={this.props.store} direction={direction.Input}/>
          </div>
          <div className={classNames(stylesPane.r)}>
            <Input store={this.props.store} direction={direction.Input}/>
          </div>
          <div className={stylesPane.clear}/>

          <Nav store={this.props.store} direction={direction.Input}/>
        </Pane>

        <Pane
          direction={direction.Output}
        >
          <div className={stylesPane.l}>
            <Currency store={this.props.store} direction={direction.Output}/>
            <Account store={this.props.store} direction={direction.Output}/>
          </div>
          <div className={stylesPane.r}>
            <Input store={this.props.store} direction={direction.Output}/>
            <ExchangeRateInvert store={this.props.store}/>
          </div>
          <div className={stylesPane.clear}/>

          <Nav store={this.props.store} direction={direction.Output}/>
        </Pane>

      </section>
    )
  }
}


export default App
