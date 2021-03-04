/*
  User model
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  image: String,
  fullname: String,
  email: {
    type: String,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: String,
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel