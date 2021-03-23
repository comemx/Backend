/*
  Local model
*/

const { Types } = require('aws-sdk/clients/acm')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const filterSchema = new Schema({
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
      default: undefined
    },
    pastor:{
      type: [Boolean],
      default: undefined
    }
  } */

    tacos:[String],
    pizza:[String],
    sushi:[String],
    ensaladas:[String],
    postres:[String],
})

const filterModel = mongoose.model('filter', filterSchema)

module.exports = filterModel