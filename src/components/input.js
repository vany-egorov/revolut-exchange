import React from "react"
import {connect} from "react-redux"

import * as actions from "../actions"


const Input = (props) => {
  return (
    <input type="text"
      value={props.value}
      onChange={props.onChange}
      onFocus={props.onFocus}
      onClick={props.onClick}
    />
  )
}


function mapStateToProps(state, ownProps) {
  console.log(ownProps)
  return {
    value: state.ui.i.value
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  console.log(ownProps)
  return {
    onChange: (e) => {
      dispatch(actions.uiInputChange(ownProps.direction, e.target.value))
    },
    onFocus: (e) => {
      dispatch(actions.uiInputFocus(ownProps.direction, e.target.value))
    },
    onClick: (e) => {
      dispatch(actions.uiInputClick(ownProps.direction, e.target.value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)
