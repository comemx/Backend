/*
  Local model
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const foodSchema = new Schema({
    locals: String,
    name: String,
    price: String,
    description: String,
    image: {
      type: [String],
      default: undefined
    },
})

const foodModel = mongoose.model('foods', foodSchema)

module.exports = foodModel