const MarkExitService = require("../../services/sessions/MarkExitService");
const MarkEntryService = require("../../services/sessions/MarkEntryService");
const ResumeHoursService = require("../../services/sessions/ResumeHoursService");


class SessionController {
  static async markEntry(req, res) {
    try {
      const { userId } = req.user;
      const { date, entryTime } = req.body;
      const result = await MarkEntryService.execute(userId, date, entryTime);
      res.send({ status: 'OK', data: result });
    } catch (error) {
      console.log('Error registrando entrada:', error);
      res.status(500).send({ error: error.message });
    }
  }

  static async markExit(req, res) {
    try {
      const { userId } = req.user;
      const { date, exitTime } = req.body;
      const result = await MarkExitService.execute(userId, date, exitTime);
      res.send({ status: 'OK', data: result });
    } catch (error) {
      console.log('Error registrando salida:', error);
      res.status(500).send({ error: error.message });
    }
  }

  static async resumeHours(req, res) {
    try {

      const { userId } = req.user;
      const { date } = req.query;

      console.log("req ", req)
      const { session, workedHours } = await ResumeHoursService.calculate(userId, date);
      res.json({
        status: 'OK',
        data: {
          date: session.date,
          entryTime: session.entryTime,
          exitTime: session.exitTime,
          workedHours: `${workedHours.hours} horas ${workedHours.minutes} minutos`
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = SessionController;
