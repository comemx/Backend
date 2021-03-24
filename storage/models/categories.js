/*
  Local model
*/

const { Types } = require('aws-sdk/clients/acm')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorieSchema = new Schema({
  /* image: {
    type: [String],
    default: undefined
  },
  localName: String,
  phoneNumber: String,
  address: String,
  days: String, */

  /* tacos:{
    type: [String],
    default: undefined
} */

  /* tacos:{
    choriso: {
      type: [Boolean],
      default: false
    },
    pastor:{
      type: [Boolean],
      default: false
    }
  } */

    tacos:[String],
    pizza:[String],
    sushi:[String],
    ensaladas:[String],
    postres:[String],
})

const categorieModel = mongoose.model('categories', categorieSchema)

module.exports = categorieModel