
const encrypt = require("../../utils/bcrypt");
const AuthRepository = require("../../repositories/AuthRepository");

class AuthRegister {

  static async ejecutar(user) {
    try {
    //   const userExists = await AuthRepository.consultaruserPorCorreo(user.email);
    //   if (userExists.length > 0) return "El usuario ya esta registrado!!";
      console.log("user ", user)
      const { password } = user;
      const date = new Date();
      console.log("password ", password)
      const passwordEncrypt = await encrypt.encrypt(password);
      return await AuthRepository.registerUser(date, passwordEncrypt, user);
    } catch (error) {
      console.error("Error actualizando user:", error.message);
      throw error;
    }
  }
}

module.exports = AuthRegister;