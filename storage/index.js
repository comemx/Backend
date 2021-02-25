//------------------------------------------------------------------------------------------------
// [Database configuration]
//------------------------------------------------------------------------------------------------

require('dotenv').config()
const db = require('mongoose')

db.Promise = global.Promise

const connect = async () => {
  try {
    await db.connect('mongodb://134.209.74.94/comemx', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log('[ Database Conecction Success ]')
  } catch (error) {
    console.log(error)
  }
}

module.exports = connect