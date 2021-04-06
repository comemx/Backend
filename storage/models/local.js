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
  coordinates: String,
  localName: String,
  phoneNumber: Number,
  categories: [{ type: Schema.Types.ObjectId, ref: 'categories' }],
  address: String,
  days: {
    type: [String],
    default: undefined,
  },
  logo: {
    type: [String],
    default: undefined
  },
  foods: [{ type: Schema.Types.ObjectId, ref: 'foods' }],
})

const localModel = mongoose.model('locals', localSchema)

module.exports = localModel