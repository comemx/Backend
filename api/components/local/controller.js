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
const bcrypt = require('bcrypt')
const { upload, s3 } = require("../../../libs/multer");
const auth = require('../../../auth/index')

//------------------------------------------------------------------------------------------------
//1.1 businessman local creation
//------------------------------------------------------------------------------------------------

const addUser = async (localName, phoneNumber, address, days, image) => {

  if (!localName || !phoneNumber || !address || !days || !image) {
    throw new Error('Missing data')
  }

  let imageUrl = ''
  if(image) {
    imageUrl = image.location
  }

    const user = {
      localName,
      phoneNumber,
      address,
      days,
      image: imageUrl,
    }

    const newLocal = await storage.add(user)

    finalResponse = {
      newLocal,
      'System message': 'Local successfully created'
    }
}


module.exports = {
  add: addUser,
}



