const mongoose = require('mongoose');
require('dotenv').config();

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB conectado ✅');
  } catch (error) {
    console.error('Error conectando MongoDB ❌', error);
  }
};

module.exports = connectMongo;
