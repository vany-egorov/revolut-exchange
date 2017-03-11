import React from "react"
import ReactDOM from "react-dom"

import App from "./components/app"
import {store, ioConnect} from "./store"
import State from "./state"
import preloadedState from "./preloaded-state"


const renderApp = (root, store) => {
  ReactDOM.render(<App store={store}/>, root)
}
const renderRedBox = (root, e) => {
  const RedBox = require("redbox-react").default
  ReactDOM.render(<RedBox error={e} />, root)
}

const root = document.getElementById("root")
const state = new State(preloadedState)
store.setInitialState(state)
let main = renderApp

if (__DEV__) {
  main = (root, store) => {
    try {
      renderApp(root, store)
    } catch (e) {
      renderRedBox(root, e)
    }
  }

  if (module.hot) {
    module.hot.accept()
  }
}

ioConnect(store)
main(root, store)
