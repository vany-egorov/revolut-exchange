import _ from "lodash"
import Bacon from "baconjs"

class Store {
  constructor() {
    this.i = new Bacon.Bus()
    this.o = new Bacon.Bus()
    this.unsubs = _([])
  }

  /* i */
  dispatch(action) { this.i.push(action) }

  register(handler) {
    let unsub = this.i
      .doAction(() => { /* middleware */ })
      .onValue(handler)

    this.unsubs
      .push(unsub)
      .commit()
  }

  /* o */
  emit(action) {
    this.o.push(action)
    return this
  }

  on(actionType, callback) {
    return this.o
      .filter((a) => { return a.type === actionType })
      .onValue(callback)
  }

  destructor() {
    this.unsubs.forEach((u) => u)

    this.i.end()
    this.o.end()
  }
}

export default Store
