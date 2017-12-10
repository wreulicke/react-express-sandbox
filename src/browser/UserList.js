const React = require("react")
import axios from "axios"
const getUsers = async () => {
  const response = await axios.get("/api/users")
  return response.data
}
import { Card, CardHeader, CardText } from "material-ui/Card"

module.exports = class User extends React.Component {
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
