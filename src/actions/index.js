const UI_ACCOUNT_PRV = Symbol("UI:ACCOUNT:PRV")
const UI_ACCOUNT_NXT = Symbol("UI:ACCOUNT:NXT")
const UI_INPUT_CHANGE = Symbol("UI:INPUT:CHANGE")
const UI_INPUT_FOCUS = Symbol("UI:INPUT:FOCUS")
const UI_INPUT_CLICK = Symbol("UI:INPUT:CLICK")
const IO_CONNECT = Symbol("IO:CONNECT")
const IO_MSG_RATES = Symbol("IO:MSG:RATES")
const IO_DISCONNECT = Symbol("IO:DISCONNECT")


/* Action Creators */
function uiAccountPrv(direction) {
  return {type: UI_ACCOUNT_PRV, direction: direction}
}

function uiAccountNxt(direction) {
  return {type: UI_ACCOUNT_NXT, direction: direction}
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

function ioConnect() { return {type: IO_CONNECT} }
function ioMsgRates(data) {
  return {type: IO_MSG_RATES, data: data}
}
function ioDisconnect() { return {type: IO_DISCONNECT} }


export {
  UI_ACCOUNT_PRV,
  UI_ACCOUNT_NXT,
  UI_INPUT_CHANGE,
  UI_INPUT_FOCUS,
  UI_INPUT_CLICK,
  IO_CONNECT,
  IO_MSG_RATES,
  IO_DISCONNECT,

  uiAccountPrv,
  uiAccountNxt,
  uiInputChange,
  uiInputFocus,
  uiInputClick,
  ioConnect,
  ioMsgRates,
  ioDisconnect
}
