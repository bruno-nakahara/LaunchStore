const User = require("../model/user")

const { formatPrice, date } = require("../../lib/utils")

module.exports = {
    registerForm(req, res) {
        return res.render('user/register')
    },
    async post(req, res) {

        return res.send('OK!')

    }
}