const Session = require('../../models/session/SessionModel');

class MarkExitService {
  static async execute(userId, date, exitTime) {
    const existingSession = await Session.findOne({ userId, date });

    if (!existingSession) {
      throw new Error('No existe un registro de entrada para esta fecha');
    }

    if (existingSession.exitTime) {
      throw new Error('Ya existe un registro de salida para esta fecha');
    }

    existingSession.exitTime = exitTime;
    await existingSession.save();

    return existingSession;
  }
}

module.exports = MarkExitService;
