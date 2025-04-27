require('dotenv').config();
const express = require("express");
const connectMongo = require('./src/config/dbMongo');

const authRoutes = require('./src/routes/auth.routes');
const sessionRoutes = require('./src/routes/session.routes');


const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', sessionRoutes);

const InitServer = async () => {
    try {

        await connectMongo();

        
        app.listen(PORT, () => {
            console.log(`Servidor en ejecución en el puerto ${PORT}`);
        });
    } catch (err) {
        console.error('No se pudo iniciar el servidor debido a un error en la base de datos:', err);
    }
}
InitServer()