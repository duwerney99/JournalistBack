const Session = require('../../models/session/SessionModel');

class ResumeHoursService {
  static async calculate(userId, date) {

    console.log("date ", date);
    const session = await Session.findOne({ userId, date });

    console.log("session ", session)
    if (!session) {
      throw new Error('No se encontró jornada para este día.');
    }

    if (!session.entryTime || !session.exitTime) {
      throw new Error('Faltan horas de entrada o salida para calcular las horas trabajadas.');
    }

    const [entryHours, entryMinutes] = session.entryTime.split(':').map(Number);
    const [exitHours, exitMinutes] = session.exitTime.split(':').map(Number);

    const entryDate = new Date(0, 0, 0, entryHours, entryMinutes, 0);
    const exitDate = new Date(0, 0, 0, exitHours, exitMinutes, 0);

    let diffMinutes = (exitDate - entryDate) / (1000 * 60);

    if (diffMinutes < 0) {
      throw new Error('La hora de salida no puede ser antes que la hora de entrada.');
    }

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    const workedHours = { hours, minutes };

    return { session, workedHours };
  }
}

module.exports = ResumeHoursService;
