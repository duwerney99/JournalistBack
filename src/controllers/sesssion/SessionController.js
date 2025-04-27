const MarkEntryService = require("../../services/sessions/MarkEntryService");


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
}

module.exports = SessionController;
