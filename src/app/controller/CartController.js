const Cart = require('../../lib/cart')
const LoadProductsService = require('../services/LoadProductService')

module.exports = {
    async index(req, res) {
        try {
            
            let { cart } = req.session

            cart = Cart.init(cart)

            return res.render("cart/index", { cart })
        } catch (err) {
            console.error(err)
        }
    },
    async addOne(req, res) {
        const { id } = req.params

        const product = await LoadProductsService.load('product', { where: { id: id }})

        let { cart } = req.session

        cart = Cart.init(cart).addOne(product)

        req.session.cart = cart

        return res.redirect('/cart')

    },
    removeOne(req, res) {
        let { cart } = req.session
        let { id } = req.params

        if(!cart) return res.redirect('/cart')

        cart = Cart.init(cart).removeOne(id)

        req.session.cart = cart

        return res.redirect('/cart')
    },
    delete(req, res) {
        let { cart } = req.session
        let { id } = req.params

        if(!cart) return res.redirect('/cart')

        req.session.cart = Cart.init(cart).delete(id)

        return res.redirect('/cart')
    }
}