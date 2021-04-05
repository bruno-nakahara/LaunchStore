const LoadProductService = require("../services/LoadProductService")
const LoadOrderService = require("../services/LoadOrderService")
const User = require("../model/user")
const Order = require("../model/order")

const mailer = require("../../lib/mailer")
const Cart = require("../../lib/cart")
const { formatPrice, date } = require("../../lib/utils")
const { order } = require("../services/LoadOrderService")

const email = (seller, product, buyer) => `
    <h2>Olá ${seller.name}</h2>
    <p>Você tem um novo pedido de compra do seu produto.</p>
    <p>Produto: ${product.name}</p>
    <p>Preço: ${product.formattedPrice}</p>
    <p></br></br></p>
    <h3>Dados do comprador:</h3>
    <p>Nome: ${buyer.name}</p>
    <p>Email: ${buyer.email}</p>
    <p>Endereço: ${buyer.address}</p>
    <p>CEP: ${buyer.cep}</p>
    <p></br></br></p>
    <p>Entre em contato com comprador para finalizar a venda!</p>
    <p></br></br></p>
    <p>Atenciosamente, Equipe Launchstore</p>
`

module.exports = {
    async index(req, res) {
        const orders = await LoadOrderService.load('orders', {
            where: { buyer_id: req.session.userId }
        })

        return res.render("orders/index", { orders })
    },
    async post(req, res) {
        try {
            const cart = Cart.init(req.session.cart)

            const buyer_id = req.session.userId
            const filteredItems = cart.items.filter(item => 
                item.product.user_id != buyer_id   
            )

            const createOrdersPromise = filteredItems.map(async item => {
                let { product, price:total, quantity } = item
                const { price, id: product_id, user_id: seller_id } = product
                const status = "open"

                const order = await Order.create({
                    seller_id,
                    buyer_id,
                    product_id,
                    price,
                    total,
                    quantity,
                    status
                })

                product = await LoadProductService.load('product', { where: {
                    id: product_id
                }})
    
                const seller = await User.findOne({ where: { id: seller_id } })
    
                const buyer = await User.findOne({ where: { id: buyer_id } })
    
                await mailer.sendMail({
                    to: seller.email,
                    from: 'no-reply@launchstore.com.br',
                    subject: 'Novo pedido de compra',
                    html: email(seller, product, buyer)
                })

                return order
            })
            await Promise.all(createOrdersPromise)

            delete req.session.cart
            Cart.init()

            return res.render('orders/success')
        } catch (err) {
            console.error(err)
            return res.render('orders/error')
        }
    }, 
    async sales(req, res) {
        const sales = await LoadOrderService.load('orders', {
            where: { seller_id: req.session.userId }
        })

        return res.render("orders/sales", { sales })
    },
    async show(req, res) {
        const order = await LoadOrderService.load('order', {
            where: { id: req.params.id }
        })

        return res.render('orders/details', { order })
    },
    async update(req, res) {
        try {
            const { id, action } = req.params

            const acceptedActions = ['close', 'cancel']

            if(!acceptedActions.includes(action)) return res.send("Can't do this action")

            const order = await Order.findOne({
                where: { id }
            })

            if(!order) return res.send("Order not found!")

            if(order.status != 'open') return res.send("Can't do this action")

            const statuses = {
                close: "sold",
                cancel: "canceled"
            }

            order.status = statuses[action]

            await Order.update(id, {
                status: order.status
            })

            res.redirect("/orders/sales")

        } catch (error) {
            console.error(error)
        }
    }
}