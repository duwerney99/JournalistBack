const { Pool } = require('pg');
require('dotenv').config();
 
const connc = new Pool({
    // host: process.env.CLOUD_SQL_CONNECTION_NAME ? `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}` : 'localhost',
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.CLOUD_SQL_CONNECTION_NAME ? 5432 : 5432, 
    ssl: false
});
 
const getConnection = async () => {
    try {
        return connc;
    } catch (error) {
        console.error('Error connect to database:', error);
        throw error;
    }
};
 
module.exports = {
    getConnection
};
