let Input = 0  // in / top
let Output = 1  // out / bottom


function other(v) {
  if (v === Input) {
    return Output
  }

  return Input
}


export default {
  Input,
  Output,
  other
}
