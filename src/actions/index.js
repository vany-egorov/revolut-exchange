const UI_ACCOUNT_PRV = Symbol("UI:ACCOUNT:PRV")
const UI_ACCOUNT_NXT = Symbol("UI:ACCOUNT:NXT")
const IO_CONNECT = Symbol("IO:CONNECT")
const IO_MSG_RATES = Symbol("IO:MSG:RATES")
const IO_DISCONNECT = Symbol("IO:DISCONNECT")


/* Action Creators */
function uiAccountPrv(paneKind) {
  return {type: UI_ACCOUNT_PRV, paneKind: paneKind}
}

function uiAccountNxt(paneKind) {
  return {type: UI_ACCOUNT_NXT, paneKind: paneKind}
}

function ioConnect() { return {type: IO_CONNECT} }
function ioMsgRates(data) {
  return {type: IO_MSG_RATES, data: data}
}
function ioDisconnect() { return {type: IO_DISCONNECT} }


export {
  UI_ACCOUNT_PRV,
  UI_ACCOUNT_NXT,

  IO_CONNECT,
  IO_MSG_RATES,
  IO_DISCONNECT,

  uiAccountPrv,
  uiAccountNxt,
  ioConnect,
  ioMsgRates,
  ioDisconnect
}
