/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - CODE INDEX

    1.1.1 [POST] ( CREATE ) FOOD
    2.2.2 [PUT] ( UPDATE ) FOOD
    3.3.3 [PUT] ( UPDATE ) FOOD IMAGE
    4.4.4 [DELETE] ( DELETE ) FOOD
    5.5.5 [GET] ( SHOW ) ALL FOODS
    6.6.X [GET] ( SHOW ) FOOD BY ID

  - MODULE EXPORTS

*/

const foodModel = require('../../../storage/models/food')
const localModel = require('../../../storage/models/local')

//------------------------------------------------------------------------------------------------
//1.1.1 ( CREATE ) FOOD
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
//2.2.2 ( UPDATE ) FOOD
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
//3.3.3 ( UPDATE ) FOOD IMAGE
//------------------------------------------------------------------------------------------------

const updateImage = async (filter, update) => {
  return await foodModel.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
//4.4.4 ( DELETE ) FOOD
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
//5.5.5 ( SHOW ) ALL FOODS
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
//6.6.X ( SHOW ) FOOD BY ID
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
  updateImage,
}