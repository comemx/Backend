/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CODE INDEX

    1.1 [POST] ( CREATE ) FOOD
    2.2 [PUT] ( UPDATE ) FOOD
    3.3 [PUT] ( UPDATE ) FOOD IMAGE
    4.4 [DELETE] ( DELETE ) FOOD
    5.5 [GET] ( SHOW ) ALL FOODS
    6.6 [GET] ( SHOW ) FOOD BY ID

  - MODULE EXPORTS

*/

const storage = require('./store')

//------------------------------------------------------------------------------------------------
//1.1 ( CREATE ) FOOD
//------------------------------------------------------------------------------------------------

const createFood = async (id, name, price, description) => {
  try{
  if (!id || !name || !price || !description) {
    throw new Error('Missing data')
  }

    const food = {
      locals: id,
      name,
      price,
      description,
      image: []
    }

    const newFood = await storage.add(id, food)

    finalResponse = {
      newFood,
      'System message': 'Food successfully created'
    }
    
    return (finalResponse)
  } catch (error) {
    throw new Error(error)
  }
}

//------------------------------------------------------------------------------------------------
//2.2 ( UPDATE ) FOOD
//------------------------------------------------------------------------------------------------

const updateFood = (id, name, price, description) => {
  return new Promise((resolve, reject) => {
    if (!id || !name || !price || !description) {
      reject('Missing data')
    }

    const food = {
      name,
      price,
      description,
    }

    const result = storage.update(id, food)

    const finalResponse = {
      food,
      'System Message': 'Food succesfully updated'
    }
    resolve(finalResponse)
  })
}

//------------------------------------------------------------------------------------------------
//3.3 ( UPDATE ) FOOD IMAGE
//------------------------------------------------------------------------------------------------

const editFoodImage = async (id, image) => {
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
//4.4 ( DELETE ) FOOD
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
//5.5 ( SHOW ) ALL FOODS
//------------------------------------------------------------------------------------------------

const getAllFoods = async (name, price, description) => {
  const result = await storage.getAllFoodsDb(name, price, description)
  return result
}

//------------------------------------------------------------------------------------------------
//6.6 ( SHOW ) FOOD BY ID
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
  updateFood,
  deleteFood,
  getAllFoods,
  getFoodById,
  editFoodImage,
}



