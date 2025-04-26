const LoginService = require("../../services/Auth/LoginService");

class LoginController {
    static async execute (req, res) {
        try {
            const token = await LoginService.generateToken(req.body)
            res.send({ status: 'OK', data: token });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = LoginController;