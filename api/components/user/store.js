/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - CODE INDEX

    1.1.1 [POST] ( CREATE ) USER
    2.2.2 [PUT] ( UPDATE ) USER
    3.3.3 [PUT] ( UPDATE ) USER IMAGE
    4.4.4 [DELETE] ( DELETE ) USER
    5.5.5 [POST] ( LOGIN ) USER
    6.6.X [GET] ( SHOW ) ALL USERS
    7.7.7 [GET] ( SHOW ) USER BY ID

  - MODULE EXPORTS

*/

const userModel = require('../../../storage/models/user')

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//1.1.1 ( CREATE ) USER
//------------------------------------------------------------------------------------------------

const add = async (user) => {
  const myUser = new userModel(user)
  try {
    return await myUser.save()
  } catch (error) {
    throw new User(error)
  }
}

//------------------------------------------------------------------------------------------------
//2.2.2 ( UPDATE ) USER
//------------------------------------------------------------------------------------------------

const update = async (filter, update) => {
  return await userModel.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
//3.3.3 ( UPDATE ) USER IMAGE
//------------------------------------------------------------------------------------------------

const updateImage = async (filter, update) => {
  console.log("informacion", filter, update)
  return await userModel.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
//4.4.4 ( DELETE ) USER
//------------------------------------------------------------------------------------------------

const remove = async (filter) => {
  const data = await userModel.findByIdAndRemove(filter)
  if (!data) {
    throw new Error('User not found')
  }
}

//------------------------------------------------------------------------------------------------
//5.5.5 ( LOGIN ) USER
//------------------------------------------------------------------------------------------------

const getOneByFilter = async (filter) => {
  const data = await userModel.find(filter)
  return data
}

//------------------------------------------------------------------------------------------------
//6.6.X ( SHOW ) ALL USERS
//------------------------------------------------------------------------------------------------

const getAllUsersDb = () => {
  return userModel.find({})
}

//------------------------------------------------------------------------------------------------
//7.7.7 ( SHOW ) USER BY ID
//------------------------------------------------------------------------------------------------

const getOneUserByIdDb = async (id) => {
  const data = await userModel
  .findById(id)
  .populate({
    path: 'favorite',
    populate: {path: 'favorite'}
  })
  .exec()

  if (data) {
    return data
  } else {
    throw new Error('User not found')
  }
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  add,
  update,
  updateImage,
  remove,
  getOneByFilter,
  getAllUsersDb,
  getOneUserByIdDb,
}