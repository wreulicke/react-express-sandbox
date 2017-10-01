import createRouter from "router5"
import loggerPlugin from "router5/plugins/logger"
import browserPlugin from "router5/plugins/browser"
import listenersPlugin from "router5/plugins/listeners"

const routes = [
  { name: "user", path: "/users" },
  { name: "test", path: "/test" },
]

module.exports = () =>
  createRouter(routes, {
    defaultRoute: "user",
  })
    .usePlugin(loggerPlugin)
    .usePlugin(
      browserPlugin({
        useHash: true,
      })
    )
    .usePlugin(listenersPlugin())
