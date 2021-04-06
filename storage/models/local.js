/*
  Local model
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const localSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'businessmen' }],
  image: {
    type: [String],
    default: undefined
  },
  logo: {
    type: [String],
    default: undefined
  },
  localName: String,
  phoneNumber: Number,
  address: {
    type: [String],
    default: undefined,
  },
  days: {
    type: [String],
    default: undefined,
  },
})

const localModel = mongoose.model('locals', localSchema)

module.exports = localModel