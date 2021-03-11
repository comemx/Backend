/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - CODE INDEX

    1.1.1 [POST] ( CREATE ) LOCAL
    2.2.2 [PUT] ( UPDATE ) LOCAL
    3.3.3 [DELETE] ( DELETE ) LOCAL
    4.4.4 [GET] ( SHOW ) ALL LOCALS
    5.5.5 [GET] ( SHOW ) LOCAL BY ID

  - MODULE EXPORTS

*/

const localModel = require('../../../storage/models/local')

//------------------------------------------------------------------------------------------------
//1.1.1 ( CREATE ) LOCAL
//------------------------------------------------------------------------------------------------

const add = async (local) => {
  const newLocal = new localModel(local)
  return newLocal.save()
}
//------------------------------------------------------------------------------------------------
//2.2.2 ( UPDATE ) LOCAL
//------------------------------------------------------------------------------------------------

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
//------------------------------------------------------------------------------------------------
//3.3.3 ( DELETE ) LOCAL
//------------------------------------------------------------------------------------------------

const remove = (id) => {
  return localModel.deleteOne({
    _id: id
  })
}
//------------------------------------------------------------------------------------------------
//4.4.4 ( SHOW ) ALL LOCALS
//------------------------------------------------------------------------------------------------

const getAllLocalsDb = async (flocalName, fphoneNumber, faddress, fdays) => {

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
//------------------------------------------------------------------------------------------------
//5.5.5 ( SHOW ) LOCAL BY ID
//------------------------------------------------------------------------------------------------

const getOneUserByIdDb = async (id) => {
  const posts = await localModel.findOne({ _id: id })
  return posts
}
//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  add,
  update,
  remove,
  getAllLocalsDb,
  getOneUserByIdDb,
}