//------------------------------------------------------------------------------------------------
// [Database configuration]
//------------------------------------------------------------------------------------------------
const { config } = require('../config/index');
const db = require('mongoose')

db.Promise = global.Promise

const connect = async () => {
  try {
    await db.connect(`${config.mongo}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log('[ Database conecction success ]')
  } catch (error) {
    console.log(error)
  }
}

module.exports = connect