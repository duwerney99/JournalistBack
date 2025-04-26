const express = require("express");
const routes = express.Router();
const auth = require('../authJsonWeb/Authentication');
const AuthController = require("../controllers/AuthController");
const LoginController = require("../controllers/auth/LoginController");


routes.post('/user-register', AuthController.registerUser);

routes.post("/login", LoginController.execute);

routes.get("/find-users", auth, AuthController.getUsers);

routes.get("/find-user-id/:userId", auth, AuthController.getUserId);

routes.put("/update-user", auth, AuthController.updateUser);

module.exports = routes