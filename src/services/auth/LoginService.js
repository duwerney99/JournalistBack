const jwt = require('jsonwebtoken');

class LoginService {
    static async generateToken(user) {
        const { name, password } = user;
        if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
            throw new Error('Las claves secretas no están definidas.');
        }

        const accessToken = jwt.sign(
          {
            name: name,
            id: password,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "60m" }
        );
        
        const refreshToken = jwt.sign(
          {
            name: name,
            id: password,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        return { accessToken, refreshToken };
    };
}

module.exports = LoginService;
