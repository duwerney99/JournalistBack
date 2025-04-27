const express = require("express");
const routes = express.Router();
const auth = require('../authJsonWeb/Authentication');
const SessionController = require("../controllers/sesssion/SessionController");


routes.post('/sessions/entry', auth, SessionController.markEntry);


module.exports = routes