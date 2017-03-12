import io from "socket.io-client"

import * as actions from "./actions"
import {default as BaseStore} from "./lib/store"
import libDirection from "./lib/exchange-direction"
import * as format from "./helpers/format"


class Store extends BaseStore {
  setInitialState(state) { this.state = state }

  onUIPrv(direction) {
    this.state.uiResetV()
    this.state.getUI(direction).currency = this.state.prvCurrency(direction)

    this
      .emit(actions.stateChangeUIV(direction))
      .emit(actions.stateChangeUIV(libDirection.other(direction)))
      .emit(actions.stateChangeUICurrency(direction))
  }

  onUINxt(direction) {
    this.state.uiResetV()
    this.state.getUI(direction).currency = this.state.nxtCurrency(direction)

    this
      .emit(actions.stateChangeUIV(direction))
      .emit(actions.stateChangeUIV(libDirection.other(direction)))
      .emit(actions.stateChangeUICurrency(direction))
  }

  onUIInputChange(direction, v) {
    let sourceDirection = direction
    let destinationDirection = libDirection.other(direction)

    v = format.currency(this.state.getUI(sourceDirection).v, v)

    let rate = this.state.rate(
      this.state.getUI(sourceDirection).currency,
      this.state.getUI(destinationDirection).currency,
    )
    this.state.getUI(sourceDirection).v = v
    this.state.getUI(destinationDirection).v = format.round(v * rate)

    this.state.ui.direction = direction

    this
      .emit(actions.stateChangeUIV(sourceDirection))
      .emit(actions.stateChangeUIV(destinationDirection))
  }

  onUIExchange() {
    if (this.state.gotOverdraft()) { return }
    if (this.state.isSameCurrency()) { return }

    this.state.exchange()
    this.state.uiResetV()

    this
      .emit(actions.stateExchange())
      .emit(actions.stateChangeUIV(libDirection.Input))
      .emit(actions.stateChangeUIV(libDirection.Output))
  }

  onIOMsgRates(raw) {
    let wasUpdated = this.state.updateRates(JSON.parse(raw))
    if (!wasUpdated) { return }

    this.state.recalculateUIV()

    this.emit(actions.stateUpdateRates())
  }
}


function ioConnect(store) {
  let host = window.location.hostname
  let port = window.location.port
  let url = `http://${host}:${port}`

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


let store = new Store()
store.register((a) => {
  switch (a.type) {
  case actions.UI_PREVIOUS:
    store.onUIPrv(a.direction)
    break
  case actions.UI_NEXT:
    store.onUINxt(a.direction)
    break
  case actions.UI_INPUT_CHANGE:
    store.onUIInputChange(a.direction, a.v)
    break
  case actions.UI_EXCHANGE:
    store.onUIExchange()
    break
  case actions.IO_MSG_RATES:
    store.onIOMsgRates(a.data)
    break
  }
})


export {
  store,
  ioConnect
}
