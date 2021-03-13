module.exports = {
    formatPrice(price) {
        return price = new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        }).format(price/100)
    },
    date(timestamp) {
        const date = new Date(timestamp)
        
        const year = date.getFullYear()
        const month = `0${date.getMonth() + 1}`.slice(-2)
        const day = `0${date.getDate()}`.slice(-2)
        const hour = date.getHours()
        const minutes = date.getMinutes()

        return {
            day,
            month,
            year,
            hour,
            minutes,
            iso: `${year}-${month}-${day}`,
            format: `${day}/${month}/${year}`
        }
    }
}