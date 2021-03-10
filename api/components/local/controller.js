/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  1.- CODE INDEX

    1.1 [addUser] client user creation
    2.2 [updateUser] client user modification
    3.3 [editImage] client user image modification
    4.4 [deleteUser] client user deletion
    5.5 [POST] client user login
  
  2.- MODULE EXPORTS

*/

const storage = require('./store')
const { upload } = require('../../../libs/multer');

//------------------------------------------------------------------------------------------------
//1.1 businessman local creation
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
//------------------------------------------------------------------------------

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

module.exports = {
  addLocal,
  updateLocal,
  deleteLocal,
}



