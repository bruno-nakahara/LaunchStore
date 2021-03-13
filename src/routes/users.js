const express = require("express")
const routes = express.Router()
const SessionController = require("../app/controller/SessionController")
const UserController = require("../app/controller/UserController")

const Validator = require('../app/validators/user')

//Login - Logout
// routes.get('/login', SessionController.loginForm)
// routes.post('/login', SessionController.login)
// routes.post('/logout', SessionController.logout)

//Reset password / forget
// routes.get('/forgot-password', SessionController.forgotForm)
// routes.get('/password-reset', SessionController.resetForm)
// routes.post('/forgot-password', SessionController.forgot)
// routes.post('/password-reset', SessionController.reset)

//User register
routes.get('/register', UserController.registerForm)
routes.post('/register', Validator.post, UserController.post)
// routes.get('/register', UserController.show)
// routes.put('/register', UserController.put)
// routes.delete('/register', UserController.delete)

module.exports = routes