const AuthRegister = require("../services/auth/AuthRegister");
const GetUsers = require("../services/auth/GetUsers");
const UpdateUser = require("../services/auth/UpdateUser");

class AuthController {
    static async registerUser(req, res) {
        try {
            console.log("req ", req.body)
            const user = await AuthRegister.execute(req.body);
            res.send({ status: 'OK', data: user });
        } catch (e) {
            console.log("Error registrando el usuario ", e);
        }
    }
    

    static async getUsers (req, res) {
        try {
            const response = await GetUsers.getUsers();
            res.json(response);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }


    static async getUserId (req, res) {
        try {
            const { userId } = req.params;
            const response = await GetUsers.getUserById(userId);
            res.send({ status: 'OK', data: response });
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    static async updateUser (req, res) {
        try {
            UpdateUser.execute(req.body);
            res.send({ status: 'OK', data: req.body });
        } catch (e) {
            console.log("Error actualizando usuario ", e);
        }
    }
}

module.exports = AuthController

