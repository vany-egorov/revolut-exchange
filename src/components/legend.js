import React from "react"

import styles from "../styles/legend.css"


function Legend() {
  return (
    <table className={styles.legend}><tbody>
      <tr>
        <th>z</th>
        <td>Previous currency</td>
      </tr>
      <tr>
        <th>x</th>
        <td>Next currency</td>
      </tr>
      <tr>
        <th>s</th>
        <td>Swap currencies</td>
      </tr>
    </tbody></table>
  )
}


export default Legend
