/*
  Businessman model
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const businessmanSchema = new Schema({
  image: {
    type: [String],
    default: undefined
  },
    fullname: String,
    email: {
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    phoneNumber: String,
    password: String,
})

const businessmanModel = mongoose.model('businessmen', businessmanSchema)

module.exports = businessmanModel