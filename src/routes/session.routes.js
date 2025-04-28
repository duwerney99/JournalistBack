const express = require("express");
const routes = express.Router();
const auth = require('../authJsonWeb/Authentication');
const SessionController = require("../controllers/sesssion/SessionController");


routes.post('/sessions/entry', auth, SessionController.markEntry);

routes.post('/sessions/exit', auth, SessionController.markExit);

routes.get('/sessions/resume', auth, SessionController.resumeHours);

module.exports = routes