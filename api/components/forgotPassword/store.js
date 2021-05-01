/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - CODE INDEX

    * ( GET ) ONE BY FILTER
    * ( UPDATE ) PASSWORD OR TOKENS

  - MODULE EXPORTS

*/

const userModel = require('../../../storage/models/user')

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//1.1.1 ( CREATE ) USER
//------------------------------------------------------------------------------------------------

const getOneByFilter = async (filter) => {
  const data = await userModel.find(filter)
  return data
}

//------------------------------------------------------------------------------------------------
//1.1.1 ( CREATE ) USER
//------------------------------------------------------------------------------------------------

const update = async (filter, update) => {
  return await userModel.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  update,
  getOneByFilter,
}