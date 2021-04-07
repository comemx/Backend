/*
  Local model
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const promotionSchema = new Schema({
    locals: [{ type: Schema.Types.ObjectId, ref: 'locals' }],
    name: String,
    price: String,
    description: String,
    image: {
      type: [String],
      default: undefined
    },
})

const promotionModel = mongoose.model('promotions', promotionSchema)

module.exports = promotionModel