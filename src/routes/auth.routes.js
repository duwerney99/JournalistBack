const express = require("express");
const routes = express.Router();
const auth = require('../authJsonWeb/Authentication');
const AuthController = require("../controllers/auth/AuthController");
const LoginController = require("../controllers/auth/LoginController");


routes.post('/register', AuthController.registerUser);

routes.post("/login", LoginController.execute);

routes.get("/users", auth, AuthController.getUsers);

routes.get("/users/:userId", auth, AuthController.getUserId);

routes.put("/users/:userId", auth, AuthController.updateUser);

routes.delete("/users/:userId", auth, AuthController.deleteUser);

module.exports = routes