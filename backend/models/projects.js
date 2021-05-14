const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _ownerId: mongoose.Types.ObjectId,

  name: String,
  description: String,
  members: [mongoose.Types.ObjectId],
});

module.exports = mongoose.model('project', schema);
