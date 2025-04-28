const { getConnection } = require('../config/dbSql');
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


  static async getUsers() {
    try {
      const connect = await getConnection();
      const response = await connect.query("SELECT * FROM public.users");
      return response.rows;
    } catch (e) {
      console.error(`No se pudo obtener los usuarios, Error:`, e.message);
      throw new Error('Error al obtener los usuarios: ' + e.message);
    }
  };

  static async getUserById(userId) {
    try {
      const connect = await getConnection();
      const response = await connect.query("SELECT * FROM public.users WHERE id = $1", [userId]);
      return response.rows;
    } catch (e) {
      console.error(`No se pudo obtener el usuario con ID: ${usuarioId}. Error:`, e.message);
      throw new Error('Error al obtener el usuario: ' + e.message);
    }

  };


  static async updateUser(user) {
    try {
      const connect = await getConnection();
      console.log("user", user)
      const userUpdate = {
        password: await encrypt.encrypt(user.password),
        name: user.name,
        role: user.role,
        create_at: new Date(),
      };
      const sql = `UPDATE public.users SET password = $1, name = $2, role = $3, create_at = $4 WHERE id = $5`;
      await connect.query(sql, [
        userUpdate.password,
        userUpdate.name,
        userUpdate.role,
        userUpdate.create_at,
        user.id
      ]);
    } catch (e) {
      console.error(`No se pudo actualizar el usuario con ID: ${user.id}. Error:`, e.message);
      throw new Error('Error al actualizar el usuario: ' + e.message);
    }
  }
 

  static async deleteUser(userId) {
    try {
      const connect = await getConnection();
      const deleteUser = `DELETE FROM public.users WHERE id = $1`;
      await connect.query(deleteUser, [userId]);
    } catch (e) {
      console.error(`No se pudo eliminar el usuario con ID: ${userId}. Error:`, e.message);
      throw new Error('Error al eliminar el usuario: ' + e.message);
    }

  }
}

module.exports = AuthRepository;