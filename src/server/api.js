const express = require("express")
const router = new express.Router()

router.use((req, res, next) => {
  res.header("Cache-Control", "private,no-store,no-cache")
  next()
})

router.get("/me", (req, res) => {
  if (req.session.name) {
    res.send({ name: req.session.name })
  } else {
    res.sendStatus(401)
  }
})

router.post("/login", (req, res) => {
  if (req.session.name != null) {
    res.status(302)
    res.send({ name: req.session.name })
  } else if (req.body.name === "admin" && req.body.password === "admin") {
    req.session.name = req.body.name
    res.send({ name: req.session.name })
  } else {
    res.sendStatus(401)
  }
})

router.get("/logout", (req, res) => {
  req.session.destroy()
  res.redirect("/")
})

router.get("/users", (req, res) => {
  if (req.session.name != null) {
    res.send([{ username: "test" }])
  } else {
    res.sendStatus(401)
  }
})

module.exports = router
