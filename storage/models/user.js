/*
  User model
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  image: {
    type: [String],
    default: undefined
  },
  fullname: {
    type: String,
    maxlength: [10,"Nombre muy largo, máximo 20 caracteres"]
  },
  email: {
    type: String,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: String,
  favorite: [{ type: Schema.Types.ObjectId, ref: 'locals' }],
  resetToken: String,
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel