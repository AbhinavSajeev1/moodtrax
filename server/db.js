const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'moodtracker', 
    password: 'abhinav',
    port: 5432
})

module.exports = pool 