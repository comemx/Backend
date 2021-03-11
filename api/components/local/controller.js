/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CODE INDEX

    1.1 [POST] ( CREATE ) LOCAL
    2.2 [PUT] ( UPDATE ) LOCAL
    3.3 [DELETE] ( DELETE ) LOCAL
    4.4 [GET] ( SHOW ) ALL LOCALS
    5.5 [GET] ( SHOW ) LOCAL BY ID

  - MODULE EXPORTS

*/

const storage = require('./store')
const { upload } = require('../../../libs/multer');

//------------------------------------------------------------------------------------------------
//1.1 ( CREATE ) LOCAL
//------------------------------------------------------------------------------------------------

const addLocal = async (localName, phoneNumber, address, days, arrayOfImage) => {
console.log("imagenes",arrayOfImage)
  try{
  if (!localName || !phoneNumber || !address || !days || !arrayOfImage) {
    throw new Error('Missing data')
  }

  let imageUrl = ''
  if(arrayOfImage) {
    imageUrl = arrayOfImage.location
  }

  const image = arrayOfImage.map(function (arrayOfImage) {
    return arrayOfImage.location
  })

    const local = {
      localName,
      phoneNumber,
      address,
      days,
      image,
    }

    const newLocal = await storage.add(local)

    finalResponse = {
      newLocal,
      'System message': 'Local successfully created'
    }
    
    return (finalResponse)
  } catch (error) {
    throw new Error(error)
  }
}

//------------------------------------------------------------------------------------------------
//2.2 ( UPDATE ) LOCAL
//------------------------------------------------------------------------------------------------

const updateLocal = (id, localName, phoneNumber, address, days, arrayOfImage) => {
  return new Promise((resolve, reject) => {
    if (!id || !localName || !phoneNumber || !address || !days) {
      reject('Missing data')
    }

    let imageUrl = ''
  if(arrayOfImage) {
    imageUrl = arrayOfImage.location
  }

  const image = arrayOfImage.map(function (arrayOfImage) {
    return arrayOfImage.location
  })

    const local = {
      localName,
      phoneNumber,
      address,
      days,
      image,
    }

    const result = storage.update(id, local)

    const finalResponse = {
      local,
      'System Message': 'Local succesfully updated'
    }
    resolve(finalResponse)
  })
}

//------------------------------------------------------------------------------------------------
//3.3 ( DELETE ) LOCAL
//------------------------------------------------------------------------------------------------

const deleteLocal = (id) => {
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
}

//------------------------------------------------------------------------------------------------
//4.4 ( SHOW ) ALL LOCALS
//------------------------------------------------------------------------------------------------

const getAllPost = async (localName, phoneNumber, address, days) => {
  const result = await storage.get(localName, phoneNumber, address, days)
  return result
}

//------------------------------------------------------------------------------------------------
//5.5 ( SHOW ) LOCAL BY ID
//------------------------------------------------------------------------------------------------

const getPost = async (id) => {
  const result = await storage.getFilter(id)
  return result
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  addLocal,
  updateLocal,
  deleteLocal,
  getAllPost,
  getPost,
}



