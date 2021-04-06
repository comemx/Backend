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

const createLocal = async ( user, localName, phoneNumber, address, coordinates, days, arrayOfImage ) => {
  console.log("user", user)
  try{
  if (!localName || !phoneNumber || !address || !coordinates || !days || !arrayOfImage) {
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
      user,
      image,
      localName,
      phoneNumber,
      categories: [],
      coordinates,
      address,
      days,
      logo: "",
      foods: ""
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

const updateLocal = (id, localName, phoneNumber, address, coordinates, days, arrayOfImage) => {
  return new Promise((resolve, reject) => {
    if (!id || !localName || !phoneNumber || !address || !coordinates || !days) {
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
      coordinates,
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


const deleteLocal = async(id, user) => {
  console.log("user", user)
  if (!id || !user) {
    throw new Error('Missing data')
  } else {
    
    const filterUser = {
      _id: user
    }
    
    const filter = {
      _id: id
    }
    
    return await storage.remove(id, user, filter)
  }
}

//------------------------------------------------------------------------------------------------
//4.4 ( SHOW ) ALL LOCALS
//------------------------------------------------------------------------------------------------

const getAllLocals = async (localName, phoneNumber, address, days) => {
  const result = await storage.getAllLocalsDb(localName, phoneNumber, address, days)
  return result
}

//------------------------------------------------------------------------------------------------
//5.5 ( SHOW ) LOCAL BY ID
//------------------------------------------------------------------------------------------------

const getLocalById = async (id) => {
  const result = await storage.getOneUserByIdDb(id)
  return result
}

//------------------------------------------------------------------------------------------------
// 6.6 [favoritePost] - ADD FAVOTITE POSTS
//------------------------------------------------------------------------------------------------

const favoritePost = async (id, idUser) => {
  if (!id || !idUser) {
    throw new Error('Missing data')
  } else {
    const data = await storage.addFavorite(id, idUser)
    return data
  }
}

//------------------------------------------------------------------------------------------------
// 7.7 [delete] - DELETE FAVOTITE POSTS
//------------------------------------------------------------------------------------------------

const deleteFavoritePost = async (id, idUser) => {
  if (!id || !idUser) {
    throw new Error('Missing data')
  } else {
    const data = await storage.deleteFavorite(id, idUser)
    return data
  }
}

//------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------

const editLogoImage = async (id, image) => {
  let imageUrl = ''
    if(image) {
      imageUrl = image.location
    }

    const imageData = {
      logo: imageUrl,
    }

    const filter = {
      _id: id
    }

    return storage.updateLogoImage(filter, imageData)
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  createLocal,
  updateLocal,
  deleteLocal,
  getAllLocals,
  getLocalById,
  favoritePost,
  deleteFavoritePost,
  editLogoImage
}



