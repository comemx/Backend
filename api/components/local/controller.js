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
const config = require('../../../config/index')
const aws = require("aws-sdk");// llamando al modulo
const multer = require("multer");//requerimos multer, el modulo de multer
const multerS3 = require("multer-s3");//llamando al modulo de s3
const { upload } = require('../../../libs/multer');

//------------------------------------------------------------------------------------------------
//1.1 ( CREATE ) LOCAL
//------------------------------------------------------------------------------------------------

const createLocal = async ( user, localName, phoneNumber, address, coordinates, days, categories ) => {
  try{
  if (!localName || !phoneNumber || !address || !coordinates || !days || !categories) {
    throw new Error('Missing data')
  }

    const local = {
      published: false,
      user,
      image: [],
      photoMenu: [],
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
  console.log("user", id, user)
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
  console.log("assssssssssssssssssssssssssssss", image)
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
//
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
//
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
//
//------------------------------------------------------------------------------------------------

const deleteImagesForGod = async () => {

  const spacesEndpoint = new aws.Endpoint(`${config.s3_endpoint}`);//devuelve una instancia del s3 endpoint y lo guardamos en una variable

  const s3 = new aws.S3({
    endpoint: spacesEndpoint,
  });


  console.log("aaaaaaaaaaaa")
  //const fileUrl = "https://comemxfiles.nyc3.digitaloceanspaces.com/descarga%20%281%29.jpg"

  const params = {
    Bucket: 'comemxfiles',
    Key: "https://comemxfiles.nyc3.digitaloceanspaces.com/descarga%20%281%29.jpg",
  }

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })

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
  deleteImagesForGod
}



