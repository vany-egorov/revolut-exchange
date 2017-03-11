const I = 0  // in / top
const O = 1  // out / bottom


function other(v) {
  if (v == I) {
    return O
  }

  return I
}


export default {
  I,
  O,
  other
}
