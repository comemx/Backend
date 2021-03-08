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
//1.1 client user creation
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
//2.2 client user modification
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
//3.3 client user image modification
//------------------------------------------------------------------------------------------------

const editImage = async (id, image) => {
console.log(image)
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
//4.4 client user deletion
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

//------------------------------------------------------------------------------------------------
//5.5 client user login
//------------------------------------------------------------------------------------------------

const loginController = async (email, password) => {
  const user = await storage.getOneByFilter({ email })
  console.log('informacion', user)

  if (user.length < 1) {
    throw new Error('Login failed')
  }
  const isCorrect = bcrypt.compareSync(password, user[0].password)
  if (isCorrect === true) {
    const token = auth.createToken(user[0]._id, user[0].email, user[0].username)
    return token
  }
}



module.exports = {
  add: addUser,
  updateUser,
  editImage,
  deleteUser,
  loginController,
}



