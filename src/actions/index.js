const UI_PRV = Symbol("UI:PRV")
const UI_NXT = Symbol("UI:NXT")
const UI_INPUT_CHANGE = Symbol("UI:INPUT:CHANGE")
const UI_INPUT_FOCUS = Symbol("UI:INPUT:FOCUS")
const UI_INPUT_CLICK = Symbol("UI:INPUT:CLICK")
const UI_EXCHANGE = Symbol("UI:EXCHANGE")
const STATE_CHANGE_UI_V = Symbol("STATE:CHANGE:UI:V")
const STATE_CHANGE_UI_CURRENCY = Symbol("STATE:CHANGE:CURRENCY")
const STATE_EXCHANGE = Symbol("STATE:EXCHANGE")
const IO_CONNECT = Symbol("IO:CONNECT")
const IO_MSG_RATES = Symbol("IO:MSG:RATES")
const IO_DISCONNECT = Symbol("IO:DISCONNECT")


function uiPrv(direction) {
  return {type: UI_PRV, direction: direction}
}

function uiNxt(direction) {
  return {type: UI_NXT, direction: direction}
}

function uiInputChange(direction, v) {
  return {type: UI_INPUT_CHANGE, direction: direction, v: v}
}

function uiInputFocus(direction, v) {
  return {type: UI_INPUT_FOCUS, direction: direction, v: v}
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

function ioConnect() { return {type: IO_CONNECT} }
function ioMsgRates(data) {
  return {type: IO_MSG_RATES, data: data}
}
function ioDisconnect() { return {type: IO_DISCONNECT} }


export {
  UI_PRV,
  UI_NXT,
  UI_INPUT_CHANGE,
  UI_INPUT_FOCUS,
  UI_INPUT_CLICK,
  UI_EXCHANGE,
  STATE_CHANGE_UI_V,
  STATE_CHANGE_UI_CURRENCY,
  STATE_EXCHANGE,
  IO_CONNECT,
  IO_MSG_RATES,
  IO_DISCONNECT,

  uiPrv,
  uiNxt,
  uiInputChange,
  uiInputFocus,
  uiInputClick,
  uiExchange,
  stateChangeUIV,
  stateChangeUICurrency,
  stateExchange,
  ioConnect,
  ioMsgRates,
  ioDisconnect
}
