
const bcrypt = require('bcrypt');


class AuthService {
    static async authenticate(email, password) {
        try {
            // 1. Buscar usuario en PostgreSQL
            const user = await User.findOne({ where: { email } });
            
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            
            // 2. Verificar contraseña
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                throw new Error('Contraseña incorrecta');
            }
            
            // 3. Retornar datos del usuario sin información sensible
            return {
                id: user.id, // ID real de PostgreSQL
                email: user.email,
                // otros campos que necesites
            };
        } catch (error) {
            console.error("Error en AuthService:", error);
            throw error;
        }
    }
}

module.exports = AuthService;