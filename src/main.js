import React from "react"
import ReactDOM from "react-dom"
import App from "./components/app"

const renderApp = (root) => { ReactDOM.render(<App />, root) }
const renderRedBox = (root, e) => {
  const RedBox = require("redbox-react").default
  ReactDOM.render(<RedBox error={e} />, root)
}

const root = document.getElementById("root")
let main = renderApp

if (__DEV__) {
  main = (root) => {
    try {
      renderApp(root)
    } catch (e) {
      renderRedBox(root, e)
    }
  }

  if (module.hot) {
    module.hot.accept()
  }
}

main(root)
