/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CODE INDEX

    1.1 [POST] ( CREATE ) USER
    2.2 [PUT] ( UPDATE ) USER
    3.3 [PUT] ( UPDATE ) USER IMAGE
    4.4 [DELETE] ( DELETE ) USER
    5.5 [POST] ( LOGIN ) USER
    6.6 [GET] ( SHOW ) ALL USERS
    7.7 [GET] ( SHOW ) USER BY ID

  - MODULE EXPORTS

*/

const storage = require('./store')
const bcrypt = require('bcrypt')
const auth = require('../../../auth/index')

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//1.1 ( CREATE ) USER
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
    }

      return storage.add(user)
    }
}

//------------------------------------------------------------------------------------------------
//2.2 ( UPDATE ) USER
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
//3.3 ( UPDATE ) USER IMAGE
//------------------------------------------------------------------------------------------------

const editUserImage = async (id, image) => {

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
//4.4 ( DELETE ) USER
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
//5.5 ( LOGIN ) USER
//------------------------------------------------------------------------------------------------

const loginUser = async (email, password) => {
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

//------------------------------------------------------------------------------------------------
//6.6 ( SHOW ) ALL USERS
//------------------------------------------------------------------------------------------------

const getAllUsers = () => {
  return storage.getAllUsersDb()
}

//------------------------------------------------------------------------------------------------
//7.7 ( SHOW ) USER BY ID
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
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  createUser,
  updateUser,
  editUserImage,
  deleteUser,
  loginUser,
  getAllUsers,
  getOneUserById,
}



