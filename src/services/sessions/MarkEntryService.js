const Session = require('../../models/session/SessionModel');

class MarkEntryService {
  static async execute(userId, date, entryTime) {
    const existingSession = await Session.findOne({ userId, date });

    if (existingSession) {
      throw new Error('Ya existe un registro de entrada para esta fecha');
    }

    const session = new Session({ userId, date, entryTime });
    await session.save();
    
    return session;
  }
}

module.exports = MarkEntryService;
