/*
  Local model
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const localSchema = new Schema({
    images: String,
    localName: String,
    phoneNumber: String,
    address: String,
    days: String,
})

const localModel = mongoose.model('local', localSchema)

module.exports = localModel