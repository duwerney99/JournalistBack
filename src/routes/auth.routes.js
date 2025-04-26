const express = require("express");
const routes = express.Router();
// const auth = require("../controllers/auth");
// const autenticacion = require('../autenticacion/Autenticacion');
const AuthController = require("../controllers/AuthController");
const LoginController = require("../controllers/auth/LoginController");


routes.post('/user-register', AuthController.registerUser);

routes.post("/login", LoginController.execute);


module.exports = routes