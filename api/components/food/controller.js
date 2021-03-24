/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CODE INDEX

  - MODULE EXPORTS

*/

const storage = require('./store')

//------------------------------------------------------------------------------------------------
//1.1 ( CREATE ) LOCAL
//------------------------------------------------------------------------------------------------

const createFood = async (name, price, description, image) => {
console.log("image",image)
  try{
  if (!name || !price || !description || !image) {
    throw new Error('Missing data')
  }

  let imageUrl = ''
  if(image) {
    imageUrl = image.location
  }

    const food = {
      name,
      price,
      description,
      image: imageUrl,
    }

    const newFood = await storage.add(food)

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
//2.2 ( UPDATE ) LOCAL
//------------------------------------------------------------------------------------------------

const updateFood = (id, name, price, description, imageFood) => {
  return new Promise((resolve, reject) => {
    if (!id || !name || !price || !description || !imageFood) {
      reject('Missing data')
    }

    let imageUrl = ''
  if(imageFood) {
    imageUrl = imageFood.location
  }

    const food = {
      name,
      price,
      description,
      imageFood: imageUrl,
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
//3.3 ( DELETE ) LOCAL
//------------------------------------------------------------------------------------------------

/* const deleteLocal = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject('Missing data')
    }

    storage.remove(id)
      .then(() => {
        resolve('Local deleted')
      })
      .catch(error => {
        reject(error)
      })
  })
} */

//------------------------------------------------------------------------------------------------
//4.4 ( SHOW ) ALL LOCALS
//------------------------------------------------------------------------------------------------

/* const getAllLocals = async (localName, phoneNumber, address, days) => {
  const result = await storage.getAllLocalsDb(localName, phoneNumber, address, days)
  return result
}
 */
//------------------------------------------------------------------------------------------------
//5.5 ( SHOW ) LOCAL BY ID
//------------------------------------------------------------------------------------------------

/* const getLocalById = async (id) => {
  const result = await storage.getOneUserByIdDb(id)
  return result
} */

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  createFood,
  updateFood,
  /* deleteLocal,
  getAllLocals,
  getLocalById, */
}


