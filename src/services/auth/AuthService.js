
const bcrypt = require('bcrypt');
const AuthRepository = require('../../repositories/AuthRepository');

class AuthService {
    static async authenticate(email, password) {
        try {
            const user = await AuthRepository.getUserByEmail(email);
            
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                throw new Error('Contraseña incorrecta');
            }
           
            return {
                id: user.id, 
                email: user.email,
            };
        } catch (error) {
            console.error("Error en AuthService:", error);
            throw error;
        }
    }
}

module.exports = AuthService;