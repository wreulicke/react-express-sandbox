require("babel-polyfill")
const React = require("react")
const ReactDOM = require("react-dom")

import axios from "axios"
import Drawer from "material-ui/Drawer"
import MenuItem from "material-ui/MenuItem"
import RaisedButton from "material-ui/RaisedButton"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { Card, CardHeader, CardText } from "material-ui/Card"

import { RouterProvider, withRoute, routeNode } from "react-router5"
const router = require("./router")()

// const injectTapEventPlugin = require("react-tap-event-plugin")

// injectTapEventPlugin()

const LeftPane = withRoute(({ open, onRequestChange, router }) => (
  <Drawer docked={false} open={open} onRequestChange={onRequestChange}>
    <MenuItem
      onClick={() => {
        router.navigate("user")
      }}
    >
      Users
    </MenuItem>
    <MenuItem
      onClick={() => {
        router.navigate("test")
      }}
    >
      Tests
    </MenuItem>
  </Drawer>
))

const Test = routeNode("test")(() => <div>test</div>)

const getUsers = async () => {
  const response = await axios.get("/api/users")
  return response.data
}

class User extends React.Component {
  constructor() {
    super()
    this.state = { users: [] }
  }
  componentWillMount() {
    getUsers().then(users => this.setState({ users }))
  }
  render() {
    return (
      <div>
        {this.state.users.map(user => (
          <Card key={user.username}>
            <CardHeader
              title={user.username}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </CardText>
          </Card>
        ))}
      </div>
    )
  }
}

const Page = withRoute(({ route }) => {
  switch (route.name) {
    case "user":
      return <User />
    case "test":
      return <Test />
  }
})

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false, name: null }
  }
  componentWillReceiveProps() {
    this.setState({ open: false })
  }
  disposeDrawer = () => {
    this.setState({
      open: false,
    })
  }
  handleToggle = () => this.setState({ open: !this.state.open })
  getMyInformation = () => {
    axios
      .get("/api/me")
      .then(res => {
        console.log(res.data.name)
      })
      .catch(e => console.error(e))
  }
  login = () => {
    axios
      .post("/api/login", { name: "admin", password: "admin" })
      .then(res => this.setState({ name: res.data.name }))
      .catch(e => console.error(e))
  }
  logout = () => {
    axios
      .get("/api/logout")
      .then(() => this.setState({ name: null }))
      .catch(e => console.error(e))
  }
  render() {
    return (
      <div>
        <LeftPane open={this.state.open} onRequestChange={this.disposeDrawer} />
        <div style={{ padding: "10px" }}>
          <RaisedButton label="Toggle Drawer" onClick={this.handleToggle} />
          {this.state.name !== null ? (
            <RaisedButton label="Show me" onClick={this.getMyInformation} />
          ) : (
            <RaisedButton label="Login" onClick={this.login} />
          )}
          {this.state.name !== null ? (
            <RaisedButton label="Logout" onClick={this.logout} />
          ) : null}
        </div>
        <div style={{ padding: "5px" }}>
          <Page />
        </div>
      </div>
    )
  }
}

const RoutingApp = routeNode("")(App)
document.addEventListener("DOMContentLoaded", () => {
  router.start(() =>
    ReactDOM.render(
      <MuiThemeProvider>
        <RouterProvider router={router}>
          <RoutingApp />
        </RouterProvider>
      </MuiThemeProvider>,
      document.getElementById("root")
    )
  )
})
