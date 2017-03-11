let USD = 0
let EUR = 1
let GBP = 2
let RUB = 3
let UNK = 100500


function parse(v) {
  v = String(v)
  v = v.toUpperCase()

  switch (v) {
  case "USD":
    return USD
  case "EUR":
    return EUR
  case "GBP":
    return GBP
  case "RUB":
  case "RUR":
    return RUB
  }

  return UNK
}

function symbol(v) {
  switch (v) {
  case USD: return "$"
  case EUR: return "€"
  case GBP: return "£"
  case RUB: return "₽"
  default:  return "-"
  }
}

function name(v) {
  switch (v) {
  case USD: return "USD"
  case EUR: return "EUR"
  case GBP: return "GBP"
  case RUB: return "RUB"
  default:  return "-"
  }
}


export {
  USD,
  EUR,
  GBP,
  RUB,

  parse,
  symbol,
  name
}
