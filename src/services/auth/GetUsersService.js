const AuthRepository = require("../../repositories/AuthRepository");


class GetUsers {
    static async getUsers() {
      try {
        return await AuthRepository.getUsers();
      } catch (e) {
        console.log("Error obteniendo usuarios ", e);
        throw error;
      }
    };
  
    
    static async getUserById(userId) {
        try {
          const response = await AuthRepository.getUserById(userId);
          return response;
        } catch (e) {
          console.log("Error obteniendo usuarios ", e);
          throw error;
        }
      };
  }
  
  module.exports = GetUsers;