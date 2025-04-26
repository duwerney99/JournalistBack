const { getConnection } = require('../config/db');
const jwt = require("jsonwebtoken");
const encrypt = require("../utils/bcrypt");

class AuthRepository {
  static async registerUser(date, passwordEncrypt, user) {
    try {
      const sql = `INSERT INTO public.users (name, email, password, role, create_at) VALUES ($1, $2, $3, $4, $5 ) RETURNING *`;
      const values = [user.name, user.email, passwordEncrypt, user.role, date];
      const connect = await getConnection();
      try {
        const response = await connect.query(sql, values);
        return response.rows[0];
      } catch (error) {
        console.error('Error registrando usuario:', error);
        throw error;
      }
    } catch (e) {
      console.error(`No se pudo registrar el usuario con ID: ${user.email}. Error:`, e.message);
      throw new Error('Error al registrar el usuario: ' + e.message);
    }
  };

 
}

module.exports = AuthRepository;