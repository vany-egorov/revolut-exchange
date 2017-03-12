/*
  ^

    (:?
        0
      | (:?
          [1-9]
          [1-9]*
        )
    )

    (:?
      \.
      [0-9]{0,2}
    )?

  $
*/
let currencyRe = /^(:?0|(:?[1-9][0-9]*))(:?\.[0-9]{0,2})?$/


// o => old
// n => new
export function currency(o, n, maxLen=9) {
  o = o.toString()
  n = n.toString()

  // drop spaces
  n = n.replace(/\s+/g, "")

  // drop leading '0' char
  // except starts-with 0.
  n = n.replace(/^(?!0\.)0+/, "")

  if (n === "") { return "0" }

  if (!currencyRe.test(n)) { return o }
  if (n.length > maxLen) { return o }

  return n
}

export function round(v) { return Math.round(100 * v) / 100 }
