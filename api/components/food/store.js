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

const foodModel = require('../../../storage/models/food')

//------------------------------------------------------------------------------------------------
//1.1.1 ( CREATE ) LOCAL
//------------------------------------------------------------------------------------------------

const add = async (food) => {
  const newFood = new foodModel(food)
  return newFood.save()
}

//------------------------------------------------------------------------------------------------
//2.2.2 ( UPDATE ) LOCAL
//------------------------------------------------------------------------------------------------

const update = async (id, food) => {
  let retrievedFood = await foodModel.findOne({
    _id: id
  })

  let entrie = Object.entries(retrievedFood)
  entrie = Object.entries(food)

  retrievedFood = Object.fromEntries(entrie)

  console.log(retrievedFood)
  const newFood = await foodModel.findByIdAndUpdate(id, retrievedFood)
  return newFood
}

//------------------------------------------------------------------------------------------------
//3.3.3 ( DELETE ) LOCAL
//------------------------------------------------------------------------------------------------

/* const remove = (id) => {
  return localModel.deleteOne({
    _id: id
  })
} */

//------------------------------------------------------------------------------------------------
//4.4.4 ( SHOW ) ALL LOCALS
//------------------------------------------------------------------------------------------------

/* const getAllLocalsDb = async (flocalName, fphoneNumber, faddress, fdays) => {

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

} */

//------------------------------------------------------------------------------------------------
//5.5.5 ( SHOW ) LOCAL BY ID
//------------------------------------------------------------------------------------------------

/* const getOneUserByIdDb = async (id) => {
  const posts = await localModel.findOne({ _id: id })
  return posts
} */

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  add,
  update,
  /* 
  remove,
  getAllLocalsDb,
  getOneUserByIdDb, */
}