const express = require("express")
const routes = express.Router()
const SearchController = require("../app/controller/SearchController")
const ProductsController = require("../app/controller/ProductsController")
const multer = require('../app/middlewares/multer')

//Search
routes.get('/search', SearchController.index)

//Products
routes.get('/create', ProductsController.create)

routes.get('/:id/edit', ProductsController.edit)

routes.get('/:id', ProductsController.show)

routes.post('/', multer.array("photos", 6), ProductsController.post)

routes.put('/', multer.array("photos", 6), ProductsController.put)

routes.delete('/', ProductsController.delete)

module.exports = routes