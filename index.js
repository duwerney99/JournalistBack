require('dotenv').config();
const express = require("express");

const authRoutes = require('./src/routes/auth.routes');
const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use('/api', authRoutes);

const InitServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Servidor en ejecución en el puerto ${PORT}`);
        });
    } catch (err) {
        console.error('No se pudo iniciar el servidor debido a un error en la base de datos:', err);
    }
}
InitServer()