const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getConnection } = require('../../config/dbSql');

class LoginService {
  static async generateToken(user) {
    try {

      const { email, password } = user;
      const connect = await getConnection();

      const response = await connect.query(
        'SELECT id, name, email, password FROM public.users WHERE email = $1',
        [email]
      );


      const dbUser = response.rows[0];
      console.log("dbUser ", dbUser)
      if (!dbUser) {
        throw new Error('Email o contraseña incorrectos');
      }

      const passwordValidate = await bcrypt.compare(password, dbUser.password);
      if (!passwordValidate) {
        throw new Error('Email o contraseña incorrectos');
      }

      const userId = dbUser.id;
      const name = dbUser.name;


      if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
        throw new Error('Las claves secretas no están definidas.');
      }

      const token = jwt.sign(
        { userId: userId, name: name },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '60m' }
      );

      return  token;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

module.exports = LoginService;
