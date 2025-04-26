const AuthRepository = require("../../repositories/AuthRepository");

class UpdateUser {

    static async execute(user) {
        try {
            return await AuthRepository.updateUser(user);
          } catch (error) {
            console.error("Error actualizando usuario:", error.message);
            throw error;
          }
    }
}

module.exports = UpdateUser;