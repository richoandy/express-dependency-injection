const mongoose = require('mongoose');

const { Schema } = mongoose;

const user = mongoose.model('documents', mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  ktpNumber: {
    type: String,
    required: true,
  },

  npwpNumber: {
    type: String,
    required: true,
  },

  passportNumber: {
    type: String,
    required: true,
  },

  isArchived: {
    type: Boolean,
    default: false,
  },

  archivedDate: {
    type: Date,
  },

  refNumber: {
    type: String,
    required: true,
  },

  version: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
}));

module.exports = user;
