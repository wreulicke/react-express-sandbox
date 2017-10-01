const express = require("express")
const morgan = require("morgan")
const app = express()
const path = require("path")
const cookie = require("cookie-parser")
const session = require("express-session")
const body = require("body-parser")
const api = require("./api")

app.use(morgan("combined"))
app.use(
  session({
    secret: "9xMTcgvMn>eTnbuKyRJpmrkz",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 60 * 1000,
    },
  })
)
app.use(cookie())
app.use(body.json())

app.get("/", function(req, res) {
  res.sendFile(path.resolve("./target/index.html"))
})

app.get("/bundle.js", (req, res) =>
  res.sendFile(path.resolve("./target/bundle.js"))
)

app.use("/api", api)

app.listen(process.env.PORT || 3000)
