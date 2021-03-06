const express = require("express")
const routes = express.Router()
const HomeController = require("../app/controller/HomeController")

const users = require('./users')
const products = require('./products')
const cart = require('./cart')
const orders = require('./orders')

//Home
routes.get('/', HomeController.index)

routes.use('/users', users)
routes.use('/products', products)
routes.use('/cart', cart)
routes.use('/orders', orders)

//Alias
routes.get('/accounts', function (req, res) {
    return res.redirect("/users/login")
})

module.exports = routes