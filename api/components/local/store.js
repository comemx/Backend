/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  1.- CODE INDEX

    1.1.1 [addUser] client user creation
    2.2.2 [updateUser] client user modification
    3.3.3 [putImage] client user image modification
    4.4.4 [removeUser] client user deletion
    5.5.5 [getOneByFilter] client user login
  
  2.- MODULE EXPORTS

*/

const localModel = require('../../../storage/models/local')

//------------------------------------------------------------------------------------------------
//1.1.1 eliminacion de usuario cliente
//------------------------------------------------------------------------------------------------

const add = async (local) => {
  const newLocal = new localModel(local)
  return newLocal.save()
}

const update = async (id, local) => {
  let retrievedLocal = await localModel.findOne({
    _id: id
  })

  let entrie = Object.entries(retrievedLocal)
  entrie = Object.entries(local)

  retrievedLocal = Object.fromEntries(entrie)

  console.log(retrievedLocal)
  const newdLocal = await localModel.findByIdAndUpdate(id, retrievedLocal)
  return newdLocal
}

const remove = (id) => {
  return localModel.deleteOne({
    _id: id
  })
}

const get = async (flocalName, fphoneNumber, faddress, fdays) => {

  filter = {}

  if (flocalName !== null) {
    filter = {
      localName: flocalName
    }
  } else if (fphoneNumber !== null) {
    filter = {
      phoneNumber: fphoneNumber
    }
  } else if (faddress !== null) {
    filter = {
      address: faddress
    }
  } else if (fdays !== null) {
    filter = {
      days: fdays
    }
  }

  const locals = await localModel.find(filter)
  return locals

}

module.exports = {
  add,
  update,
  remove,
  get,
}