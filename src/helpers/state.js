import exchangeDirection from "../lib/exchange-direction"


function getUIState(state, direction) {
  if direction == exchangeDirection.I {
    return state.ui.i
  }

  return state.ui.o
}
