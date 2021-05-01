/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - CODE INDEX

    1.1.1 [POST] ( CREATE ) PROMOTION
    2.2.2 [PUT] ( UPDATE ) PROMOTION
    3.3.3 [PUT] ( UPDATE ) PROMOTION IMAGE
    4.4.4 [DELETE] ( DELETE ) PROMOTION
    5.5.5 [GET] ( SHOW ) ALL PROMOTIONS
    6.6.X [GET] ( SHOW ) PROMOTION BY ID

  - MODULE EXPORTS

*/

const promotionModel = require('../../../storage/models/promotion')
const localModel = require('../../../storage/models/local')

//------------------------------------------------------------------------------------------------
//1.1.1 ( CREATE ) PROMOTION
//------------------------------------------------------------------------------------------------

const add = async (id, promotion) => {
  const newPromotion = new promotionModel(promotion)
  const localData = await localModel.findById(id)
  localData.promotions.push(newPromotion)
  localData.save()
  localModel.updateOne()
  return newPromotion.save()
}

//------------------------------------------------------------------------------------------------
//2.2.2 ( UPDATE ) PROMOTION
//------------------------------------------------------------------------------------------------

const update = async (id, promotion) => {
  let retrievedPromotion = await promotionModel.findOne({
    _id: id
  })

  let entrie = Object.entries(retrievedPromotion)
  entrie = Object.entries(promotion)

  retrievedPromotion = Object.fromEntries(entrie)

  const newPromotion = await promotionModel.findByIdAndUpdate(id, retrievedPromotion)
  return newPromotion
}

//------------------------------------------------------------------------------------------------
//3.3.3 ( UPDATE ) PROMOTION IMAGE
//------------------------------------------------------------------------------------------------

const updateImage = async (filter, update) => {
  return await promotionModel.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
//4.4.4 ( DELETE ) PROMOTION
//------------------------------------------------------------------------------------------------

const remove = async (id, filter) => {
  const promotionData = await promotionModel.find(filter)
  const local = await promotionData[0].locals[0]
  const localData = await localModel.findOne(local)
  localData.promotions.remove({
    _id: id
  })
  localData.save()
  localModel.updateOne()
  if (!promotionData) {
    throw new Error('Food not found')
  }
}

//------------------------------------------------------------------------------------------------
//5.5.5 ( SHOW ) ALL PROMOTIONS
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

  const foods = await promotionModel.find(filter)
  return foods

}

//------------------------------------------------------------------------------------------------
//6.6.X ( SHOW ) PROMOTION BY ID
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
  updateImage
}