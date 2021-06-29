/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - CODE INDEX

    * ( GET ) ONE BY FILTER USER
    * ( UPDATE ) PASSWORD OR TOKENS USER
    * ( GET ) ONE BY FILTER BUSINESSMAN
    * ( UPDATE ) PASSWORD OR TOKENS BUSINESSMAN

  - MODULE EXPORTS

*/

const userModel = require('../../../storage/models/user')
const promotionModel = require('../../../storage/models/businessman')

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//( GET ) USER
//------------------------------------------------------------------------------------------------

const getOneByFilter = async (filter) => {
  const data = await userModel.find(filter)
  return data
}

//------------------------------------------------------------------------------------------------
//( UPDATE ) USER
//------------------------------------------------------------------------------------------------

const update = async (filter, update) => {
  return await userModel.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
//( GET ) USBUSINESSMANER
//------------------------------------------------------------------------------------------------

const getOneByFilterBusinessman = async (filter) => {
  const data = await promotionModel.find(filter)
  return data
}

//------------------------------------------------------------------------------------------------
//( UPDATE ) BUSINESSMAN
//------------------------------------------------------------------------------------------------

const updateBusinessman = async (filter, update) => {
  return await promotionModel.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  update,
  getOneByFilter,
  getOneByFilterBusinessman,
  updateBusinessman
}