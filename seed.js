const { hash } = require("bcryptjs")
const faker = require("faker")

const User = require("./src/app/model/user")
const Product = require("./src/app/model/product")
const File = require("./src/app/model/file")

let usersIds = []
let productsIds = []
let totalProducts = 10
let totalUsers = 3

async function createUsers() {
    const users = []
    const password = await hash('1111', 8)

    while (users.length < totalUsers) {
        users.push({
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password,
            cpf_cnpj: faker.random.number(99999999999),
            cep: faker.random.number(99999999),
            address: faker.address.streetName(),
        })
    }

    const usersPromise = users.map(user => User.create(user))

    usersIds = await Promise.all(usersPromise)
}

async function createProducts() {
    let products = []

    while(products.length < totalProducts) {
        products.push({
            category_id: Math.ceil(Math.random() * 3),
            user_id: usersIds[Math.floor(Math.random() * totalUsers)],
            name: faker.name.title(),
            description: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
            old_price: faker.random.number(9999),
            price: faker.random.number(9999),
            quantity: faker.random.number(99),
            status: Math.round(Math.random())
        })
    }

    const productsPromise = products.map(product => Product.create(product))
    productsIds = await Promise.all(productsPromise)

    let files = []

    while(files.length < 50) {
        files.push({
            name: faker.image.image(),
            path: `public/images/placeholder.png`,
            product_id: productsIds[Math.floor(Math.random() * totalProducts)]
        })
    }

    const filesPromise = files.map(file => File.create(file))
    await Promise.all(filesPromise)
}

async function init() {
    await createUsers()
    await createProducts()
}

init()