import * as actions from "../actions"


function onUIInputChange(state, v) {
  return {ui:{i:{v:v}}}
}

function dispather(state = {}, action) {
  switch (action.type) {
  case actions.UI_INPUT_CHANGE:
    return onUIInputChange(state, action.v)
  default:
    return state
  }
}

function reducer(state = {}, action) {
  return {
    ...state,
    ...dispather(state, action)
  }
}


export default reducer
