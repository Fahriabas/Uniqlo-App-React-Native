const express = require("express");
const Controller = require("../controllers/controller");
const Router = express.Router();


Router.get("/", (req, res) => {
    res.send("hello world")
})

//routing for product
Router.get("/products", Controller.findAllProduct)
Router.get("/products/:id", Controller.findOneProduct)
Router.post("/products/create", Controller.createProduct)
Router.put("/products/:id", Controller.updateProduct)
Router.delete("/products/:id", Controller.deleteProduct)


//routing for user
Router.get("/users", Controller.findAllUser)
Router.get("/users/:_id", Controller.findOneUser)
Router.post("/register", Controller.register)
Router.delete("/users/:_id", Controller.deleteUserById)



// Router.get()

module.exports = Router;
