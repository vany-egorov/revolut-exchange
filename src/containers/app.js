import React from "react"
import {Provider} from "react-redux"
import AppComponent from "../components/app"

const App = ({store}) => {
  return <Provider store={store}>
    <AppComponent />
  </Provider>
}

export default App
