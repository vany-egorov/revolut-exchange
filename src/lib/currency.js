const USD = 0
const EUR = 1
const GBP = 2
const RUB = 3


function symbol(v) {
  switch (v) {
  case USD:
    return "$"
  case EUR:
    return "€"
  case GBP:
    return "£"
  case RUB:
    return "RUB"
  default:
    return "-"
  }
}

function name(v) {
  switch (v) {
  case USD:
    return "USD"
  case EUR:
    return "EUR"
  case GBP:
    return "GBP"
  case RUB:
    return "RUB"
  default:
    return "-"
  }
}


export {
  USD,
  EUR,
  GBP,
  RUB,

  symbol,
  name
}
