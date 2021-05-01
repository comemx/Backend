/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CODE INDEX

    1.1 [POST] ( CREATE ) BUSINESSMAN
    2.2 [PUT] ( UPDATE ) BUSINESSMAN
    3.3 [PUT] ( UPDATE ) BUSINESSMAN IMAGE
    4.4 [DELETE] ( DELETE ) BUSINESSMAN
    5.5 [GET] ( SHOW ) ALL BUSINESSMEN
    6.6 [GET] ( SHOW ) BUSINESSMAN BY ID
    7.7 [GET] ( SHOW ) BUSINESSMAN lOCALS

  - MODULE EXPORTS

*/

const storage = require('./store')
const bcrypt = require('bcrypt')
const auth = require('../../../auth/index')

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//1.1 ( CREATE ) BUSINESSMAN
//------------------------------------------------------------------------------------------------

const createUser = async (fullname, email, password) => {

  if (!fullname || !email || !password) {
    throw new Error('Missing data')
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
      image: [],
      fullname,
      email,
      phoneNumber: '',
      password: hashedPassword,
      resetToken: ""
    }

      return storage.add(user)
    }
}

//------------------------------------------------------------------------------------------------
//2.2 ( UPDATE ) BUSINESSMAN
//------------------------------------------------------------------------------------------------

const updateUser = async (userUpdate) => {
console.log("userUpdate", userUpdate)
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
    const userUpdated = await storage.update(filter, userUpdate)
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
//3.3 ( UPDATE ) BUSINESSMAN IMAGE
//------------------------------------------------------------------------------------------------

const editUserImage = async (id, image) => {
  console.log("imagen en controlador", image)

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
//4.4 ( DELETE ) BUSINESSMAN
//------------------------------------------------------------------------------------------------

const deleteUser = async(id) => {

  if (id) {
    const filter = {
      _id: id
    }
    return await storage.remove(filter)
  } else {
    throw new Error('Id needed')
  }
}

//------------------------------------------------------------------------------------------------
//5.5 ( SHOW ) ALL BUSINESSMEN
//------------------------------------------------------------------------------------------------

const getAllUsers = () => {
  return storage.getAllUsersDb()
}

//------------------------------------------------------------------------------------------------
//6.6 ( SHOW ) BUSINESSMAN BY ID
//------------------------------------------------------------------------------------------------

const getOneUserById = async (id) => {
  if (!id) {
    throw new Error('id needed')
  } else {
    const data = await storage.getOneUserByIdDb(id)
    return data
  }
}

//------------------------------------------------------------------------------------------------
//7.7 ( SHOW ) BUSINESSMAN lOCALS
//------------------------------------------------------------------------------------------------

const getLocalsOfUser = async (id) => {
  if (!id) {
    throw new Error('id needed')
  } else {
    const data = await storage.getLocalsOfUserDb(id)
    return data
  }
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  createUser,
  updateUser,
  editUserImage,
  deleteUser,
  getAllUsers,
  getOneUserById,
  getLocalsOfUser
}



