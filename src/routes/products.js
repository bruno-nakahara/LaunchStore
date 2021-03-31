const express = require("express")
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const SearchController = require("../app/controller/SearchController")
const ProductsController = require("../app/controller/ProductsController")

const { onlyUsers } = require('../app/middlewares/session')

const productValidator = require("../app/validators/product")

//Search
routes.get('/search', SearchController.index)

//Products
routes.get('/create', onlyUsers, ProductsController.create)

routes.get('/:id/edit', onlyUsers, ProductsController.edit)

routes.get('/:id', ProductsController.show)

routes.post('/', onlyUsers, multer.array("photos", 6), productValidator.post, ProductsController.post)

routes.put('/', onlyUsers, multer.array("photos", 6), productValidator.put, ProductsController.put)

routes.delete('/', onlyUsers, ProductsController.delete)

module.exports = routes