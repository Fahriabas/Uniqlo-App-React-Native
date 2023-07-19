const express = require("express")
const Controller = require("../controllers/controller")
const Router = express.Router()


Router.get("/", (req, res) => {
    res.send("hello world")
})

Router.get("/users", Controller.findAllUser)
Router.post("/register", Controller.registerUser)
Router.delete("/users/:id", Controller.deleteById)
Router.get("/users/:id", Controller.findOneUser)



module.exports = Router