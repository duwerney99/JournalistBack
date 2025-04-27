const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '12345',
    database: process.env.POSTGRES_DB || 'journalist_back',
    ssl: false,
});


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


const getConnection = async (retries = 5) => {
    while (retries) {
        try {
            const client = await pool.connect();
            console.log('✅ Conexión a PostgreSQL exitosa');
            client.release();
            return pool;
        } catch (error) {
            console.error('❌ Error conectando a PostgreSQL:', error.message);
            retries -= 1;
            console.log(`Reintentando conexión a PostgreSQL... (${retries} intentos restantes)`);
            await delay(2000);
        }
    }
    throw new Error('No se pudo conectar a PostgreSQL después de varios intentos');

};

module.exports = {
    getConnection
};
