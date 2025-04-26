const AuthRegister = require("../services/auth/AuthRegisterService");
const DeleteUserService = require("../services/auth/DeleteUserService");
const GetUsers = require("../services/auth/GetUsersService");
const UpdateUser = require("../services/auth/UpdateUserService");

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

    static async deleteUser (req, res) {
        try {
            const response = await DeleteUserService.execute(req.params.userId);
            res.send({ status: "OK", data: response });
        } catch (e) {
            if (e.message.includes('No se pudo verificar la existencia del usuario')) {
                res.status(500).json({ error: 'Error interno del servidor' });
            } else if (e.message.includes('Usuario con ID')) {
                res.status(404).json({ error: e.message });
            } else {
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        }
    };
}

module.exports = AuthController

