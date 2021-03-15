const User = require("../model/user")
const { formatCpfCnpj, formatCep } = require("../../lib/utils")


module.exports = {
    registerForm(req, res) {

        return res.render('user/register')
    },
    async post(req, res) {
        try {
            const userId = await User.create(req.body)

            req.session.userId = userId

            return res.redirect('/users')
        } catch (err) {
            console.error(err)
            return res.render("user/register", {
                user: req.body,
                error: "Error ao cadastrar!"
            })
        }
    },
    async show(req, res) {
        const { user } = req

        user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
        user.cep = formatCep(user.cep)

        return res.render('user/index', { user })
    },
    async update(req, res) {
        try {
            const { user } = req
            let { name, email, cpf_cnpj, cep, adress } = req.body
            cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
            cep = cep.replace(/\D/g, "")

            await User.update(user.id, {
                name,
                email,
                cpf_cnpj,
                cep,
                adress
            })

            return res.render("user/index", {
                user: req.body,
                success: "Conta atualizada com sucesso!"
            })

        } catch (err) {
            console.error(err)
            return res.render("user/index", {
                error: "Error!"
            })
        }
    },
    async delete(req, res) {
        try {
            await User.delete(req.body.id)
            req.session.destroy()

            return res.render("session/login", {
                success: "Conta deletada com sucesso!"
            })

        } catch (err) {
            console.error(err)
            return res.render("user/index", {
                user: req.body,
                error: "Error ao deletar!"
            })
        }
    }
}