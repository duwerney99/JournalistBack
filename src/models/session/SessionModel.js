const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  entryTime: {
    type: String,
  },
  exitTime: {
    type: String,
  }
}, {
  timestamps: true,
  collection: 'work_sessions'
});

module.exports = mongoose.model('Session', SessionSchema);
