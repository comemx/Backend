/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CODE INDEX

    1.1 [POST] ( CREATE ) LOCAL
    2.2 [PUT] ( UPDATE ) LOCAL
    3.3 [POST] ( UPDATE ) LOCAL IMAGES
    4.4 [POST] ( UPDATE ) LOCAL LOGO
    5.5 [DELETE] ( DELETE ) LOCAL
    6.6 [GET] ( SHOW ) ALL LOCALS
    7.7 [GET] ( SHOW ) LOCAL BY ID
    8.8 [POST] (ADD) FAVOTITE POSTS
    9.9 [DELETE] (DELETE) FAVOTITE POSTS
    10.10 [POST] (CREATE) PHOTO MENU

  - MODULE EXPORTS

*/

const storage = require('./store')

//------------------------------------------------------------------------------------------------
//1.1 ( CREATE ) LOCAL
//------------------------------------------------------------------------------------------------

const createLocal = async ( user, localName, phoneNumber, address, coordinates, days, categories ) => {
  try{
  if (!localName || !phoneNumber || !address || !coordinates || !days || !categories) {
    throw new Error('Missing data')
  }

    const local = {
      published: true,
      user,
      localName,
      phoneNumber,
      categories,
      coordinates,
      address,
      days,
      logo: [],
      promotions: [],
      foods: []
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

const updateLocal = (id, localName, phoneNumber, address, coordinates, days) => {
  return new Promise((resolve, reject) => {
    if (!id || !localName || !phoneNumber || !address || !coordinates || !days) {
      reject('Missing data')
    }

    const local = {
      localName,
      phoneNumber,
      address,
      coordinates,
      days,
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
//3.3 ( UPDATE ) LOCAL IMAGES
//------------------------------------------------------------------------------------------------

const editLocalImages = async (id, arrayOfImage) => {

  let imageUrl = ''
  if(arrayOfImage) {
    imageUrl = arrayOfImage.location
  }

  const image = arrayOfImage.map(function (arrayOfImage) {
    return arrayOfImage.location
  })

    const imageData = {
      image
    }
    
    const filter = {
      _id: id
    }

    return storage.updateLocalImage(filter, imageData)
}

//------------------------------------------------------------------------------------------------
//4.4 ( UPDATE ) LOCAL LOGO
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
//5.5 ( DELETE ) LOCAL
//------------------------------------------------------------------------------------------------

const deleteLocal = async(id, user) => {
  if (!id || !user) {
    throw new Error('Missing data')
  } else {

    const filter = {
      _id: id
    }
    
    return await storage.remove(id, user, filter)
  }
}

//------------------------------------------------------------------------------------------------
//6.6 ( SHOW ) ALL LOCALS
//------------------------------------------------------------------------------------------------

const getAllLocals = async (localName, phoneNumber, address, days) => {
  const result = await storage.getAllLocalsDb(localName, phoneNumber, address, days)
  return result
}

//------------------------------------------------------------------------------------------------
//7.7 ( SHOW ) LOCAL BY ID
//------------------------------------------------------------------------------------------------

const getLocalById = async (id) => {
  const result = await storage.getOneUserByIdDb(id)
  return result
}

//------------------------------------------------------------------------------------------------
// 8.8 ( ADD ) FAVOTITE POSTS
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
// 9.9 ( DELETE ) FAVOTITE POSTS
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
//10.10 (CREATE) PHOTO MENU
//------------------------------------------------------------------------------------------------

const editMenuImage = async (id, imageMenu) => {
  
  let imageUrl = ''
  if(imageMenu) {
    imageUrl = imageMenu.location
  }

  const photoMenu = imageMenu.map(function (imageMenu) {
    return imageMenu.location
  })

    const imageData = {
      photoMenu
    }
    
    const filter = {
      _id: id
    }

    return storage.updateMenuImage(filter, imageData)
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
  editLogoImage,
  editMenuImage,
  editLocalImages,
}



