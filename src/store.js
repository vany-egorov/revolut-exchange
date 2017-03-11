import io from "socket.io-client"

import * as actions from "./actions"
import {default as BaseStore} from "./lib/store"
import direction from "./lib/exchange-direction"
import * as format from "./helpers/format"


class Store extends BaseStore {
  setInitialState(state) { this.state = state }

  onUIInputChange(drc, v) {
    const srcDrc = drc  // source direction
    const dstDrc = direction.other(drc)  // destination direction

    v = format.currency(this.state.getUI(srcDrc).v, v)

    const rate = this.state.rate(
      this.state.getUI(srcDrc).currency,
      this.state.getUI(dstDrc).currency,
    )
    this.state.getUI(srcDrc).v = v
    this.state.getUI(dstDrc).v = format.round(v * rate)

    this
      .emit(actions.stateChangeUI(srcDrc))
      .emit(actions.stateChangeUI(dstDrc))
  }

  onUIPrv(drc) {
    this.state.uiResetV()
    this.state.getUI(drc).currency = this.state.prvCurrency(drc)

    this
      .emit(actions.stateChangeUI(drc))
      .emit(actions.stateChangeUI(direction.other(drc)))
      .emit(actions.stateChangeUICurrency(drc))
  }

  onUINxt(drc) {
    this.state.uiResetV()
    this.state.getUI(drc).currency = this.state.nxtCurrency(drc)

    this
      .emit(actions.stateChangeUI(drc))
      .emit(actions.stateChangeUI(direction.other(drc)))
      .emit(actions.stateChangeUICurrency(drc))
  }
}


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


const store = new Store()
store.register((a) => {
  switch (a.type) {
  case actions.UI_INPUT_CHANGE:
    store.onUIInputChange(a.direction, a.v)
    break
  case actions.UI_PRV:
    store.onUIPrv(a.direction)
    break
  case actions.UI_NXT:
    store.onUINxt(a.direction)
    break
  }
})


export {
  store,
  ioConnect
}
