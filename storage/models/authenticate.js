/*
  User model
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const authenticateSchema = new Schema({
  /* image: {
    type: [String],
    default: undefined
  }, */
  authenticate: String,
 /*  email: {
    type: String,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: String,
  favorite: [{ type: Schema.Types.ObjectId, ref: 'locals' }], */
})

const authenticateModel = mongoose.model('authenticate', authenticateSchema)

module.exports = authenticateModel