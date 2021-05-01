/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CODE INDEX

    1.1 [POST] ( CREATE ) PROMOTION
    2.2 [PUT] ( UPDATE ) PROMOTION
    3.3 [PUT] ( UPDATE ) PROMOTION IMAGE
    4.4 [DELETE] ( DELETE ) PROMOTION
    5.5 [GET] ( SHOW ) ALL PROMOTIONS
    6.6 [GET] ( SHOW ) PROMOTION BY ID

  - MODULE EXPORTS

*/

const storage = require('./store')

//------------------------------------------------------------------------------------------------
//1.1 ( CREATE ) PROMOTION
//------------------------------------------------------------------------------------------------

const createFood = async (id, name, price, description, image) => {
  try{
  if (!id || !name || !price || !description || !image) {
    throw new Error('Missing data')
  }

  let imageUrl = ''
  if(image) {
    imageUrl = image.location
  }

    const promotion = {
      locals: id,
      name,
      price,
      description,
      image: imageUrl,
    }

    const newPromotion = await storage.add(id, promotion)

    finalResponse = {
      newPromotion,
      'System message': 'Promotion successfully created'
    }
    
    return (finalResponse)
  } catch (error) {
    throw new Error(error)
  }
}

//------------------------------------------------------------------------------------------------
//2.2 ( UPDATE ) PROMOTION
//------------------------------------------------------------------------------------------------

const updatePromotion = (id, name, price, description) => {
  return new Promise((resolve, reject) => {
    if (!id || !name || !price || !description) {
      reject('Missing data')
    }

    const promotion = {
      name,
      price,
      description,
    }

    const newPromotion = storage.update(id, promotion)

    const finalResponse = {
      promotion,
      'System Message': 'Promotion succesfully updated'
    }
    resolve(finalResponse)
  })
}

//------------------------------------------------------------------------------------------------
//3.3 ( UPDATE ) PROMOTION IMAGE
//------------------------------------------------------------------------------------------------

const editPromotionImage = async (id, image) => {
  let imageUrl = ''
    if(image) {
      imageUrl = image.location
    }

    const imageData = {
      image: imageUrl,
    }

    const filter = {
      _id: id
    }

    return storage.updateImage(filter, imageData)
}

//------------------------------------------------------------------------------------------------
//4.4 ( DELETE ) PROMOTION
//------------------------------------------------------------------------------------------------

const deleteFood = async(id) => {
  if (!id) {
    throw new Error('Missing data')
  } else {

    const filter = {
      _id: id
    }
    
    return await storage.remove(id, filter)
  }
}

//------------------------------------------------------------------------------------------------
//5.5 ( SHOW ) ALL PROMOTIONS
//------------------------------------------------------------------------------------------------

const getAllFoods = async (name, price, description) => {
  const result = await storage.getAllFoodsDb(name, price, description)
  return result
}

//------------------------------------------------------------------------------------------------
//6.6 ( SHOW ) PROMOTION BY ID
//------------------------------------------------------------------------------------------------

const getFoodById = async (id) => {
  const result = await storage.getOneFoodByIdDb(id)
  return result
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  createFood,
  updatePromotion,
  deleteFood,
  getAllFoods,
  getFoodById,
  editPromotionImage
}



