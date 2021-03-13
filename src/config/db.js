const { Pool } = require("pg")

module.exports = new Pool({
    user: 'postgres',
    password: '38973119',
    host: 'localhost',
    port: 5432,
    database: 'launchstoredb'
})