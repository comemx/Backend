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
const localModel = require('../../../storage/models/local')

//------------------------------------------------------------------------------------------------
//1.1.1 ( CREATE ) LOCAL
//------------------------------------------------------------------------------------------------

const add = async (id, food) => {
  const newFood = new foodModel(food)
  const localData = await localModel.findById(id)
  localData.foods.push(newFood)
  localData.save()
  localModel.updateOne()
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

  console.log("retrievedFood", retrievedFood)
  const newFood = await foodModel.findByIdAndUpdate(id, retrievedFood)
  return newFood
}

//------------------------------------------------------------------------------------------------
//3.3.3 ( DELETE ) LOCAL
//------------------------------------------------------------------------------------------------

const remove = async (id, filter) => {
  const foodData = await foodModel.find(filter)
  const local = await foodData[0].locals[0]
  const localData = await localModel.findOne(local)
  localData.foods.remove({
    _id: id
  })
  localData.save()
  localModel.updateOne()
  if (!foodData) {
    throw new Error('Food not found')
  }
}

//------------------------------------------------------------------------------------------------
//4.4.4 ( SHOW ) ALL LOCALS
//------------------------------------------------------------------------------------------------

const getAllFoodsDb = async (fname, fprice, fdescription, fdays) => {

  filter = {}

  if (fname !== null) {
    filter = {
      name: fname
    }
  } else if (fprice !== null) {
    filter = {
      price: fprice
    }
  } else if (fdescription !== null) {
    filter = {
      description: fdescription
    }
  }

  const foods = await foodModel.find(filter)
  return foods

}

//------------------------------------------------------------------------------------------------
//5.5.5 ( SHOW ) LOCAL BY ID
//------------------------------------------------------------------------------------------------

const getOneFoodByIdDb = async (id) => {
  const posts = await foodModel.findOne({ _id: id })
  return posts
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  add,
  update,
  remove,
  getAllFoodsDb,
  getOneFoodByIdDb,
}