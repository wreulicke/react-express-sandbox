const React = require("react")
import Drawer from "material-ui/Drawer"
import MenuItem from "material-ui/MenuItem"
import { withRoute } from "react-router5"
import { connect } from "react-redux"

module.exports = withRoute(
  connect(
    state => {
      return { open: state.DrawerState.open }
    },
    (dispatch, { router }) => {
      return {
        disposeDrawer() {
          dispatch({ type: "CLOSE" })
        },
        toUser() {
          router.navigate("user")
        },
        toTest() {
          router.navigate("test")
        },
      }
    }
  )(({ open, disposeDrawer, toUser, toTest }) => (
    <Drawer docked={false} open={open} onRequestChange={disposeDrawer}>
      <MenuItem onClick={toUser}>Users</MenuItem>
      <MenuItem onClick={toTest}>Tests</MenuItem>
    </Drawer>
  ))
)
