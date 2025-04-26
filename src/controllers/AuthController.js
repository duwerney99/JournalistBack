const AuthRegister = require("../services/auth/AuthRegister");

class AuthController {
    static async registerUser(req, res) {
        try {
            console.log("req ", req.body)
            const user = await AuthRegister.ejecutar(req.body);
            res.send({ status: 'OK', data: user });
        } catch (e) {
            console.log("Error registrando el usuario ", e);
        }
    }

}

module.exports = AuthController

