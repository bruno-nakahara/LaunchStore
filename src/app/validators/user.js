const User = require("../model/user")

async function post(req, res, next) {
    //Check fields
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all the fields!')
        }
    }

    //Check user existence
    let { email, cpf_cnpj, password, passwordRepeat } = req.body

    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

    const user = await User.findOne({
        where: { email },
        or: { cpf_cnpj }
    })

    if (user) return res.send('User exist!')

    //Check password match
    if (password != passwordRepeat) return res.send('Password mismatch')

    next()
}

module.exports = {
    post
}