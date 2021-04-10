//------------------------------------------------------------------------------------------------
// [Database configuration]
//------------------------------------------------------------------------------------------------

const { config } = require('../config/index');
const mongoose = require('mongoose');

const connect = async() => {
  mongoose.set('useFindAndModify', false);
  mongoose.connect(`${config.mongo}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('[ Database conecction success ]');
  });
} 


module.exports = connect