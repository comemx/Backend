/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - CODE INDEX

  1.1.1 [POST] ( VERIFY ) TOKEN
  2.2.2 [POST] ( PUSH ) TOKEN USER IN DATABASE
  3.3.3 [POST] ( FIND ) USER
  4.4.4 [POST] ( FIND ) BUSINESSMAN
  5.5.5 [DELETE] ( LOGOUT ) USER
  
  - MODULE EXPORTS
  
  */

const userModel = require('../../../storage/models/user')
const authenticateModel = require('../../../storage/models/authenticate')

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//1.1.1 ( VERIFY ) TOKEN
//------------------------------------------------------------------------------------------------

const verifyExists = async (filter) => {
  const result = await authenticateModel.exists(filter)
  console.log("2", result)
  return result
}

//------------------------------------------------------------------------------------------------
//2.2.2 ( PUSH ) TOKEN USER IN DATABASE
//------------------------------------------------------------------------------------------------

const pushToken = async (refreshTokenForDatabase) => {
  const myRefreshToken = new authenticateModel(refreshTokenForDatabase)
  try {
    return await myRefreshToken.save()
  } catch (error) {
    throw new User(error)
  }
}

//------------------------------------------------------------------------------------------------
//3.3.3 ( FIND ) USER
//------------------------------------------------------------------------------------------------

const getOneByFilterUser = async (filter) => {
  const data = await userModel.find(filter)
  return data
}

//------------------------------------------------------------------------------------------------
//4.4.4 ( FIND ) BUSINESSMAN
//------------------------------------------------------------------------------------------------

const getOneByFilterBusinessman = async (filter) => {
  const data = await userModel.find(filter)
  return data
}

//------------------------------------------------------------------------------------------------
//5.5.5 ( LOGOUT ) USER
//------------------------------------------------------------------------------------------------

const removeRefreshToken = async (id) => {
  return deleteToken = authenticateModel.remove({
    user: id
  })
}

/* 
const removeRefreshToken = async (id) => {
  return authenticateModel.remove({
   user: id
   })
 } */


//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  pushToken,
  verifyExists,
  getOneByFilterUser,
  getOneByFilterBusinessman,
  removeRefreshToken,
}