/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  1.- CODE INDEX

    1.1 [addUser] client user creation
    2.2 [updateUser] client user modification
    3.3 [editImage] client user image modification
    4.4 [deleteUser] client user deletion
  
  2.- MODULE EXPORTS

*/

const storage = require('./store')
const bcrypt = require('bcrypt')
const { upload, s3 } = require("../../../libs/multer");

//------------------------------------------------------------------------------------------------
//1.1 eliminacion de usuario cliente
//------------------------------------------------------------------------------------------------

const addUser = async (fullname, email, username, password, image) => {

  if (!fullname || !email || !username || !password) {
    throw new Error('Missing data')
  }

  let imageUrl = ''
  if(image) {
    imageUrl = image.location
  }

  const emailExists = await storage.getOneByFilter({ email })

  if (emailExists.length >= 1) {
      throw new Error('Email used')
    } else {
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, async (err, hashed) => {
          if (err) {
            reject(err)
          } else {
            resolve(hashed)
          }
        })
      })

    const user = {
      fullname,
      email,
      image: imageUrl,
      username,
      password: hashedPassword
    }

      return storage.add(user)
    }
}

//------------------------------------------------------------------------------------------------
//2.2 eliminacion de usuario cliente
//------------------------------------------------------------------------------------------------

const updateUser = async (userUpdate) => {

  if (userUpdate) {
    if (userUpdate.password) {
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(userUpdate.password, 10, async (err, hashed) => {
          if (err) {
            reject(err)
          } else {
            resolve(hashed)
          }
        })
      })
      
      userUpdate.password = hashedPassword
    }
    const filter = {
      _id: userUpdate._id
    }
    const userUpdated = await storage.updateUser(filter, userUpdate)
    if (userUpdated) {
      return userUpdated
    } else {
      throw new Error('User not found')
    }
  } else {
    throw new Error('Error updating user')
  }
}

//------------------------------------------------------------------------------------------------
//3.3 eliminacion de usuario cliente
//------------------------------------------------------------------------------------------------

const editImage = async (id, image) => {

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

    return storage.putImage(filter, imageData)
}

//------------------------------------------------------------------------------------------------
//4.4 eliminacion de usuario cliente
//------------------------------------------------------------------------------------------------

const deleteUser = async(id) => {

  if (id) {
    const filter = {
      _id: id
    }
    return await storage.removeUser(filter)
  } else {
    throw new Error('Id needed')
  }
}

module.exports = {
  add: addUser,
  updateUser,
  editImage,
  deleteUser,
}



