let re = /\B(?=(\d{3})+(?!\d))/g


export function currency(v) {
  let parts = v.toString().split(".")
  parts[0] = parts[0].replace(re, " ")
  return parts.join(".")
}
