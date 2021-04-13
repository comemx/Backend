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
  photoMenu: {
    type: [String],
    default: undefined
  },
  coordinates: [{ type: Object}],
  localName: String,
  phoneNumber: Number,
  categories: [{ type: Object}],
  address: String,
  days: [{ type: Object}],
  logo: {
    type: [String],
    default: undefined
  },
  promotions: [{ type: Schema.Types.ObjectId, ref: 'promotions' }],
  foods: [{ type: Schema.Types.ObjectId, ref: 'foods' }],
})

const localModel = mongoose.model('locals', localSchema)

module.exports = localModel