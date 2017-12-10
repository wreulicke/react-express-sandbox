require("babel-polyfill")
const React = require("react")
const ReactDOM = require("react-dom")

import axios from "axios"
import RaisedButton from "material-ui/RaisedButton"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

import { RouterProvider } from "react-router5"
import { Provider, connect } from "react-redux"
import { createStore, combineReducers } from "redux"
const router = require("./router")()

// const injectTapEventPlugin = require("react-tap-event-plugin")

// injectTapEventPlugin()

const LeftPane = require("./LeftPane")
const Page = require("./Page")

const getMyInformation = () => {
  axios
    .get("/api/me")
    .then(res => {
      console.log(res.data.name)
    })
    .catch(e => console.error(e))
}

const App = ({ name, toggleDrawer, login, logout }) => (
  <div>
    <LeftPane />
    <div style={{ padding: "10px" }}>
      <RaisedButton label="Toggle Drawer" onClick={toggleDrawer} />
      {name != null ? (
        <RaisedButton label="Show me" onClick={getMyInformation} />
      ) : (
        <RaisedButton label="Login" onClick={login} />
      )}
      {name != null ? <RaisedButton label="Logout" onClick={logout} /> : null}
    </div>
    <div style={{ padding: "5px" }}>
      <Page />
    </div>
  </div>
)

const RoutingApp = connect(
  state => {
    return { name: state.LoginState.name }
  },
  dispatch => {
    return {
      login() {
        axios
          .post("/api/login", { name: "admin", password: "admin" })
          .then(res => dispatch({ type: "LOGIN", name: res.data.name }))
          .catch(e => console.error(e))
      },
      toggleDrawer() {
        dispatch({ type: "TOGGLE" })
      },
      logout() {
        axios
          .get("/api/logout")
          .then(() => dispatch({ type: "LOGOUT" }))
          .catch(e => console.error(e))
      },
    }
  }
)(App)

const LoginState = (state = {}, { type, name }) => {
  switch (type) {
    case "LOGIN":
      return { name }
    case "LOGOUT":
      return { name: null }
  }
  return state
}

const DrawerState = (state = { open: false }, { type, open }) => {
  switch (type) {
    case "TOGGLE":
      return { open: !open }
    case "CLOSE":
      return { open: false }
  }
  return state
}

const rootReducer = combineReducers({ LoginState, DrawerState })
const store = createStore(rootReducer, undefined) // eslint-disable-line no-undefined

document.addEventListener("DOMContentLoaded", () => {
  router.start(() =>
    ReactDOM.render(
      <MuiThemeProvider>
        <RouterProvider router={router}>
          <Provider store={store}>
            <RoutingApp />
          </Provider>
        </RouterProvider>
      </MuiThemeProvider>,
      document.getElementById("root")
    )
  )
})
