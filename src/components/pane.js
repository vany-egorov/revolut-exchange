import React from "react"


class Pane extends React.Component {
  render() {
    return (
      <div className="pane">
        {this.props.children}
      </div>
    )
  }
}


export default Pane
