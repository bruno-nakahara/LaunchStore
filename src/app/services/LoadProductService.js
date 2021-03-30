const Product = require("../model/product")

const { formatPrice, date } = require("../../lib/utils")

async function getImages(productId) {
    let files = await Product.files(productId)
    files = files.map(file => ({
        ...file,
        src: `${file.path.replace("public", "")}`
    }))
    
    return files
}

async function format(product) { 
    const files = await getImages(product.id)
    product.img = files[0].src
    product.files = files
    product.formattedPrice = formatPrice(product.price)
    product.formattedOldPrice = formatPrice(product.old_price)

    const { day, hour, minutes, month } = date(product.updated_at)

    product.published = {
        day: `${day}/${month}`,
        hour: `${hour}h ${minutes}min`,
    }
    
    return product
}

const LoadService = {
    load(service, filter) {
        this.filter = filter
        
        return this[service](filter)
    },
    async product() {
        try {
            const product = await Product.findOne(this.filter)

            return format(product)

        } catch (error) {
            console.error(error)
        }
    },
    async products() {
        try {
            const products = await Product.findAll(this.filter)
            const productsPromise = products.map(product => {
                
                format(product)
            }) //products.map(product => format(product))
            const result = await Promise.all(productsPromise)
            
            return result

        } catch (error) {
            console.error(error)
        }
    },
    format,
}

module.exports = LoadService