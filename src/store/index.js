import io from "socket.io-client"
import {applyMiddleware, compose, createStore} from "redux"

import reducer from "../reducers"
import * as actions from "../actions"


function ioConnect(store) {
  const host = window.location.hostname
  const port = window.location.port
  const url = `http://${host}:${port}`

  io(url)
    .on("connect", function() {
      store.dispatch(actions.ioConnect())
    })
    .on("rates", function(data) {
      store.dispatch(actions.ioMsgRates(data))
    })
    .on("disconnect", function() {
      store.dispatch(actions.ioDisconnect())
    })
}

function configureStore(preloadedState = {}) {
  const middlewares = []
  const enhancers = []

  const store = createStore(
    reducer,
    preloadedState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  )

  if ((__DEV__) && (module.hot)) {
    module.hot.accept("../reducers", () => {
      const reducer = require("../reducers").default
      store.replaceReducer(reducer)
    })
  }

  return store
}

export {configureStore, ioConnect}
