/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - CODE INDEX

    1.1.1 [POST] ( CREATE ) BUSINESSMAN
    2.2.2 [PUT] ( UPDATE ) BUSINESSMAN
    3.3.3 [PUT] ( UPDATE ) BUSINESSMAN IMAGE
    4.4.4 [DELETE] ( DELETE ) BUSINESSMAN
    5.5.5 [GET] ( SHOW ) ALL BUSINESSMEN
    6.6.X [GET] ( SHOW ) BUSINESSMAN BY ID
    7.7.7 [GET] ( SHOW ) BUSINESSMAN lOCALS
    8.8.8 ( FILTER ) USER MODEL

  - MODULE EXPORTS

*/

const businessmanModel = require('../../../storage/models/businessman')

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//1.1.1 ( CREATE ) BUSINESSMAN
//------------------------------------------------------------------------------------------------

const add = async (user) => {
  const myUser = new businessmanModel(user)
  try {
    return await myUser.save()
  } catch (error) {
    throw new Error(error)
  }
}

//------------------------------------------------------------------------------------------------
//2.2.2 ( UPDATE ) BUSINESSMAN
//------------------------------------------------------------------------------------------------

const update = async (filter, update) => {
  return await businessmanModel.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
//3.3.3 ( UPDATE ) BUSINESSMAN IMAGE
//------------------------------------------------------------------------------------------------

const updateImage = async (filter, update) => {
  console.log("informacion", filter, update)
  return await businessmanModel.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
//4.4.4 ( DELETE ) BUSINESSMAN
//------------------------------------------------------------------------------------------------

const remove = async (filter) => {
  const data = await businessmanModel.findByIdAndRemove(filter)
  if (!data) {
    throw new Error('User not found')
  }
}

//------------------------------------------------------------------------------------------------
//5.5.5 ( SHOW ) ALL BUSINESSMEN
//------------------------------------------------------------------------------------------------

const getAllUsersDb = () => {
  return businessmanModel.find({})
}

//------------------------------------------------------------------------------------------------
//6.6.X ( SHOW ) BUSINESSMAN BY ID
//------------------------------------------------------------------------------------------------

const getOneUserByIdDb = async (id) => {
  const data = await businessmanModel.findById(id).exec()

  if (data) {
    return data
  } else {
    throw new Error('User not found')
  }
}

//------------------------------------------------------------------------------------------------
//7.7.7 ( SHOW ) BUSINESSMAN lOCALS
//------------------------------------------------------------------------------------------------

const getLocalsOfUserDb = async (id) => {
  const data = await businessmanModel
  .findById(id)
  .populate({
    path: 'locals',
    populate: {path: 'locals'}
  })
  .exec()

  if (data) {
    return data
  } else {
    throw new Error('User not found')
  }
}

//------------------------------------------------------------------------------------------------
//8.8.8 ( FILTER ) USER MODEL
//------------------------------------------------------------------------------------------------

const getOneByFilter = async (filter) => {
  const data = await businessmanModel.find(filter)
  return data
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  add,
  update,
  updateImage,
  remove,
  getAllUsersDb,
  getOneUserByIdDb,
  getLocalsOfUserDb,
  getOneByFilter
}