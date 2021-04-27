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
const userModel = require('../../../storage/models/user')
const businessmanModel = require('../../../storage/models/businessman')

//------------------------------------------------------------------------------------------------
//1.1.1 ( CREATE ) LOCAL
//------------------------------------------------------------------------------------------------

const add = async (local) => {
  const newLocal = new localModel(local)
  const userData = await businessmanModel.findById(local.user)
    userData.locals.push(newLocal)
    userData.save()
    businessmanModel.updateOne()
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

const remove = async (id, idUser, filter) => {
  //console.log("",)
  const data = await localModel.findByIdAndRemove(filter)
  const user = await businessmanModel.findOne({ _id: idUser })
  user.locals.remove({
    _id: id
  })
  user.save()
  businessmanModel.updateOne()
  if (!data) {
    throw new Error('User not found')
  }
}



/* const deleteFavorite = async (id, idUser) => {
  const data = await userModel.findById(idUser)
  data.favorite.remove({
    _id: id
  })
  data.save()
  userModel.update()
} */

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

  console.log("filter",filter)

  const locals = await localModel
  .find(filter)
  .exec()
  return locals

}

//------------------------------------------------------------------------------------------------
//5.5.5 ( SHOW ) LOCAL BY ID
//------------------------------------------------------------------------------------------------

const getOneUserByIdDb = async (id) => {
  //.populate('tags')
  const posts = await localModel
  .findOne({ _id: id })
  .populate('foods')
  .populate('promotions')
  .populate('user')
  .exec()
  return posts
}
//------------------------------------------------------------------------------------------------
// 6.6.x [addFavorite] - ADD FAVOTITE POSTS
//------------------------------------------------------------------------------------------------

const addFavorite = async (id, idUser) => {
  console.log("id, idUser store", id, idUser)
  const data = await userModel.findById(idUser)
  console.log("data", data)
  data.favorite.push(id)
  userModel.updateOne()
  return data.save()
}

//------------------------------------------------------------------------------------------------
// 7.7.7 [deleteFavorite] - DELETE FAVOTITE POSTS
//------------------------------------------------------------------------------------------------
const deleteFavorite = async (id, idUser) => {
  const data = await userModel.findById(idUser)
  data.favorite.remove({
    _id: id
  })
  data.save()
  userModel.updateOne()
}
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

const updateLogoImage = async (filter, update) => {
  console.log("informacion", filter, update)
  return await localModel.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

const updateMenuImage = async (filter, update) => {
  console.log("informacion", filter, update)
  return await localModel.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

const updateLocalImage = async (filter, update) => {
  console.log("informacion", filter, update)
  return await localModel.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
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
  addFavorite,
  deleteFavorite,
  updateLogoImage,
  updateMenuImage,
  updateLocalImage
}