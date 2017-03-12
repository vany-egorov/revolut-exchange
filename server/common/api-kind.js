let ECB = 0
let OpenExchange = 1


function name(v) {
  switch(v) {
  case ECB:
    return "ECB"
  case OpenExchange:
    return "open-exchange-rates"
  }

  return ""
}


module.exports = {
  ECB,
  OpenExchange,

  name
}
