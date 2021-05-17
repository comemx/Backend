/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - CODE INDEX

    1.1.1 [POST] ( CREATE ) LOCAL
    2.2.2 [PUT] ( UPDATE ) LOCAL
    3.3.3 [POST] ( UPDATE ) LOCAL IMAGES
    4.4.4 [POST] ( UPDATE ) LOCAL LOGO
    5.5.5 [DELETE] ( DELETE ) LOCAL
    6.6.X [GET] ( SHOW ) ALL LOCALS
    7.7.7 [GET] ( SHOW ) LOCAL BY ID
    8.8.8 [POST] (ADD) FAVOTITE POSTS
    9.9.9 [DELETE] (DELETE) FAVOTITE POSTS
    10.10.10 [POST] (CREATE) PHOTO MENU

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

const update = async (filter, local) => {
  return await localModel.findOneAndUpdate(filter, local, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
//3.3.3 ( UPDATE ) LOCAL IMAGES
//------------------------------------------------------------------------------------------------

const updateLocalImage = async (filter, update) => {
  return await localModel.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
//4.4.4 ( UPDATE ) LOCAL LOGO
//------------------------------------------------------------------------------------------------

const updateLogoImage = async (filter, update) => {
  return await localModel.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
//5.5.5 ( DELETE ) LOCAL
//------------------------------------------------------------------------------------------------

const remove = async (id, idUser, filter) => {
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

//------------------------------------------------------------------------------------------------
//6.6.X ( SHOW ) ALL LOCALS
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

  const locals = await localModel
  .find(filter)
  .exec()
  return locals

}

//------------------------------------------------------------------------------------------------
//7.7.7 ( SHOW ) LOCAL BY ID
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
// 8.8.8 ( ADD ) FAVOTITE POSTS
//------------------------------------------------------------------------------------------------

const addFavorite = async (id, idUser) => {
  const data = await userModel.findById(idUser)
  data.favorite.push(id)
  userModel.updateOne()
  return data.save()
}

//------------------------------------------------------------------------------------------------
//9.9.9 ( DELETE ) FAVOTITE POSTS
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
//10.10.10 (CREATE) PHOTO MENU
//------------------------------------------------------------------------------------------------

const updateMenuImage = async (filter, update) => {
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