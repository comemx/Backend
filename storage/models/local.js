/*
  Local model
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const localSchema = new Schema({
  image: {
    type: [String],
    default: undefined
  },
  localName: String,
  phoneNumber: String,
  address: String,
  days: String,
})

const localModel = mongoose.model('locals', localSchema)

module.exports = localModel