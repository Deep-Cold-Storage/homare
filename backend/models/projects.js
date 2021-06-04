const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _userId: mongoose.Types.ObjectId,

  name: String,
  description: String,
  members: [{ _userId: mongoose.Types.ObjectId }],
  palettes: [{ name: String, colors: [String] }],
});

schema.virtual('members.user', {
  ref: 'user',
  localField: 'members._userId',
  foreignField: '_id',
  justOne: true,
});

module.exports = mongoose.model('project', schema);
