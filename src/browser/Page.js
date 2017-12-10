const React = require("react")
import { withRoute } from "react-router5"
const UserList = require("./UserList")

module.exports = withRoute(({ route }) => {
  switch (route.name) {
    case "user":
      return <UserList />
    case "test":
      return <div>test</div>
  }
})
