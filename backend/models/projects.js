const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _userId: mongoose.Types.ObjectId,

  name: String,
  description: String,
  members: [mongoose.Types.ObjectId],
  palettes: [{ name: String, colors: [String] }],
});

module.exports = mongoose.model('project', schema);
