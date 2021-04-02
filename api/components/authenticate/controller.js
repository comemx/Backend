/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CODE INDEX

    1.1 [POST] ( VERIFY ) TOKEN
    2.2 [POST] ( LOGIN ) USER
    3.3 [POST] ( LOGIN ) BUSINESSMAN
    4.4 [DELETE] ( LOGOUT ) USER

  - MODULE EXPORTS

*/

const storage = require('./store')
const bcrypt = require('bcrypt')
const auth = require('../../../auth/index')
const { config } = require('../../../config/index');
const jwt = require('jsonwebtoken');

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//1 ( VERIFY ) TOKEN
//------------------------------------------------------------------------------------------------

const verifyRefreshToken = async (refreshToken) => {
console.log("1",refreshToken)
  if (!refreshToken) {
    throw new Error('something wrong happened')
  }

  const filter = {
    authenticate: refreshToken
  }

  const verifyInDatabase = await storage.verifyExists(filter)
  
  if(verifyInDatabase === false){
    throw new Error('something wrong happened')
  } else {
    const tokenData = jwt.verify(refreshToken, `${config.refresh_token_secret}`)
    const user = tokenData
    const accessToken = jwt.sign({ user: user.id, email: user.email, fullname: user.fullname}, `${config.access_token_secret}` ,{
      expiresIn: '30m'
    })
    return accessToken
  }
}

//------------------------------------------------------------------------------------------------
//2 ( LOGIN ) USER
//------------------------------------------------------------------------------------------------

const loginUser = async (email, password) => {
  const user = await storage.getOneByFilterUser({email})
  console.log("user",user)

  if (user.length < 1) {
    throw new Error('Login failed')
  }

  const userId = user[0]._id
  console.log("userId",userId)

  const isCorrect = bcrypt.compareSync(password, user[0].password)
  if (isCorrect === true) {
    const accessToken = auth.createAccessToken(user[0]._id, user[0].email, user[0].fullname)
    const refreshToken = auth.createRefreshToken(user[0]._id, user[0].email, user[0].fullname)

    const refreshTokenForDatabase = {
      user: userId,
      authenticate: refreshToken

    }
    
    const save = await storage.pushToken(refreshTokenForDatabase)

    return {accessToken, refreshToken, save}

  }
}

//------------------------------------------------------------------------------------------------
//3 ( LOGIN ) BUSINESSMAN
//------------------------------------------------------------------------------------------------

const loginBusinessman = async (email, password) => {
  const user = await storage.getOneByFilterBusinessman({ email })

  if (user.length < 1) {
    throw new Error('Login failed')
  }
  const isCorrect = bcrypt.compareSync(password, user[0].password)
  if (isCorrect === true) {
    const accessToken = auth.createAccessToken(user[0]._id, user[0].email, user[0].fullname)
    const refreshToken = auth.createRefreshToken(user[0]._id, user[0].email, user[0].fullname)

    const refreshTokenForDatabase = {
      authenticate: refreshToken
    }
    
    const save = await storage.pushToken(refreshTokenForDatabase)

    return {accessToken, refreshToken, save}

  }
}

//------------------------------------------------------------------------------------------------
//4 ( LOGOUT ) USER
//------------------------------------------------------------------------------------------------

const logoutUser = async (token) => {
  if(!token) {
    throw new Error('Missing data')
  }

  const tokenData = jwt.verify(token, `${config.access_token_secret}`)
  if(!tokenData.id){
    throw new Error('something wrong happened')
  } else {
    const id = tokenData.id
    const filter = {
      user: id
    }
    const deleteRefreshToken = await storage.removeRefreshToken(id)

    return deleteRefreshToken
  }
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  verifyRefreshToken,
  loginUser,
  loginBusinessman,
  logoutUser,
}