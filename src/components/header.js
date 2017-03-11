import React from "react"

import styles from "../styles/header.css"


class Header extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        {this.props.children}
      </div>
    )
  }
}


export default Header
