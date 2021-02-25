/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

[code index]

  1.- CONTROLLER FUNCTIONS

    1.1 [addUser] - CREATE USER
    2.2 [updateUser] - UPDATE USER
    3.3 [deleteUserController] - DELETE USER
    4.4 [getAll] - SHOW ALL USERS
    5.5 [getOne] - SHOW USER FOR ID
    6.6 [loginController] - USER LOGIN
    7.7 [getUserPosts] - USER POSTS
    8.8 [getAllFavorites] - SHOW FAVORITE POSTS OF USER

  2.- [MODULE EXPORTS]

*/

const storage = require('./store')
const bcrypt = require('bcrypt')

const addUser = async (fullname, email, username, password, description) => {
    if (!fullname || !email || !username || !password) {
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
        fullname,
        email,
        username,
        description,
        password: hashedPassword
      }
  
      return storage.add(user)
    }
  }

module.exports = {
    add: addUser,
  }
  