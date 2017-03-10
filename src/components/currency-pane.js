import React from "react"
import direction from "./currency-pane-direction"


class CurrencyPane extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let txt = ""
    if (this.props.direction == direction.Top) {
      txt = "top"
    } else {
      txt = "bottom"
    }

    return (
      <div className="currency-pane">
        currency-pane {txt} <br/>
        <input/>
      </div>
    )
  }
}


export default CurrencyPane
