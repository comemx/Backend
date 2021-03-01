/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  1.- CODE INDEX

    1.1.1 [addUser] client user creation
    2.2.2 [updateUser] client user modification
    3.3.3 [putImage] client user image modification
    4.4.4 [removeUser] client user deletion
  
  2.- MODULE EXPORTS

*/

const Model = require('../../../storage/models/user')

//------------------------------------------------------------------------------------------------
//general methods
//------------------------------------------------------------------------------------------------

const getOneByFilter = async (filter) => {
  const data = await Model.find(filter)
  return data
}

//------------------------------------------------------------------------------------------------
//1.1.1 eliminacion de usuario cliente
//------------------------------------------------------------------------------------------------

const addUser = async (user) => {
  const myUser = new Model(user)
  try {
    return await myUser.save()
  } catch (error) {
    throw new Error(error)
  }
}

//------------------------------------------------------------------------------------------------
//2.2.2 eliminacion de usuario cliente
//------------------------------------------------------------------------------------------------

const updateUser = async (filter, update) => {
  return await Model.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
//3.3.3 eliminacion de usuario cliente
//------------------------------------------------------------------------------------------------

const putImage = async (filter, update) => {
  console.log("informacion", filter, update)
  return await Model.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
//4.4.4 eliminacion de usuario cliente
//------------------------------------------------------------------------------------------------

const removeUser = async (filter) => {
  const data = await Model.findByIdAndRemove(filter)
  if (!data) {
    throw new Error('User not found')
  }
}

module.exports = {
  add: addUser,
  getOneByFilter,
  updateUser,
  putImage,
  removeUser,
}