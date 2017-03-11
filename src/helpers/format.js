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
export function currency(o, n, maxLen=7) {
  o = o.toString()
  n = n.toString()

  if (n === "") { return "0" }

  // drop leading '0' char
  n = n.replace(/^0+/, "")

  if (!currencyRe.test(n)) { return o }
  if (n.length > maxLen) { return o }

  return n
}

export function round(v) { return Math.round(100 * v) / 100 }
