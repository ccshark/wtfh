var mongoose = require('mongoose');

var PartySchema = new mongoose.Schema({
  name: {
      type: String
  },
  password: {
    type: String
  }
}, {
    timestamps: true
});

module.exports = mongoose.model('Party', PartySchema);
