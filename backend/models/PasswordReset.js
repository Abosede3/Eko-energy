const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PasswordResetSchema = new Schema({
  userId: String,
  uniqueString: String,
  createdAt: Date,
  expiresAt: Date,
})

const PasswordReset = mongoose.model('passwordReset', PasswordResetSchema)

module.exports = PasswordReset