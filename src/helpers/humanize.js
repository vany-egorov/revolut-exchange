let re = /\B(?=(\d{3})+(?!\d))/g


export function currency(v) {
  let parts = v.toString().split(".")
  parts[0] = parts[0].replace(re, " ")
  return parts.join(".")
}

export function byte(v, significantFigures=1) {
  let l = "B"

  if (
      (v > 256) &&  // 2**8
      (v <= 262144) // 2**18
    ) {
    v = v/1024 // 2**10
    l = "KB"
  } else if (v <= 268435456) { // 2**28
    v = v/1048576 // 2**20
    l = "MB"
  } else if (v <= 274877906944) { // 2**38
    v = v/1073741824 // 2**30
    l = "GB"
  } else if (v > 274877906944) { // 2**38
    v = v/1.0995116e+12 // 2**40
    l = "TB"
  }

  v = v.toFixed(significantFigures)

  return `${v} ${l}`
}
