let UI_PREVIOUS = Symbol("UI:PREVIOUS")
let UI_NEXT = Symbol("UI:NEXT")
let UI_INPUT_CHANGE = Symbol("UI:INPUT:CHANGE")
let UI_INPUT_FOCUS = Symbol("UI:INPUT:FOCUS")
let UI_INPUT_FOCUS_CHANGE = Symbol("UI:INPUT:FOCUS:CHANGE")
let UI_INPUT_BLUR = Symbol("UI:INPUT:BLUR")
let UI_INPUT_CLICK = Symbol("UI:INPUT:CLICK")
let UI_EXCHANGE = Symbol("UI:EXCHANGE")
let STATE_CHANGE_UI_V = Symbol("STATE:CHANGE:UI:V")
let STATE_CHANGE_UI_CURRENCY = Symbol("STATE:CHANGE:CURRENCY")
let STATE_EXCHANGE = Symbol("STATE:EXCHANGE")
let STATE_UPDATE_RATES = Symbol("STATE:UPDATE:RATES")
let OTHER_INPUT_FOCUS = Symbol("OTHER:INPUT:FOCUS")
let IO_CONNECT = Symbol("IO:CONNECT")
let IO_MSG_RATES = Symbol("IO:MSG:RATES")
let IO_DISCONNECT = Symbol("IO:DISCONNECT")


function uiPrevious(direction) {
  return {type: UI_PREVIOUS, direction: direction}
}

function uiNext(direction) {
  return {type: UI_NEXT, direction: direction}
}

function uiInputChange(direction, v) {
  return {type: UI_INPUT_CHANGE, direction: direction, v: v}
}

function uiInputFocus(direction, v) {
  return {type: UI_INPUT_FOCUS, direction: direction, v: v}
}

function uiInputFocusChange(direction) {
  return {type: UI_INPUT_FOCUS_CHANGE, direction: direction}
}

function uiInputBlur(direction) {
  return {type: UI_INPUT_BLUR, direction: direction}
}

function uiInputClick(direction, v) {
  return {type: UI_INPUT_CLICK, direction: direction, v: v}
}

function uiExchange() { return {type: UI_EXCHANGE} }

function stateChangeUIV(direction) {
  return {type: STATE_CHANGE_UI_V, direction: direction}
}

function stateChangeUICurrency(direction) {
  return {type: STATE_CHANGE_UI_CURRENCY, direction: direction}
}

function stateExchange() { return {type: STATE_EXCHANGE} }
function stateUpdateRates() { return {type: STATE_UPDATE_RATES} }

function otherInputFocus(direction) {
  return {type: OTHER_INPUT_FOCUS, direction: direction}
}

function ioConnect() { return {type: IO_CONNECT} }
function ioMsgRates(data) {
  return {type: IO_MSG_RATES, data: data}
}
function ioDisconnect() { return {type: IO_DISCONNECT} }


export {
  UI_PREVIOUS,
  UI_NEXT,
  UI_INPUT_CHANGE,
  UI_INPUT_FOCUS,
  UI_INPUT_FOCUS_CHANGE,
  UI_INPUT_BLUR,
  UI_INPUT_CLICK,
  UI_EXCHANGE,
  STATE_CHANGE_UI_V,
  STATE_CHANGE_UI_CURRENCY,
  STATE_EXCHANGE,
  STATE_UPDATE_RATES,
  OTHER_INPUT_FOCUS,
  IO_CONNECT,
  IO_MSG_RATES,
  IO_DISCONNECT,

  uiPrevious,
  uiNext,
  uiInputChange,
  uiInputFocus,
  uiInputFocusChange,
  uiInputBlur,
  uiInputClick,
  uiExchange,
  stateChangeUIV,
  stateChangeUICurrency,
  stateExchange,
  stateUpdateRates,
  otherInputFocus,
  ioConnect,
  ioMsgRates,
  ioDisconnect
}
