/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CODE INDEX

    1.1 [POST] ( CREATE ) USER
    2.2 [PUT] ( UPDATE ) USER

  - MODULE EXPORTS

*/

const storage = require('./store')
const bcrypt = require('bcrypt')
const auth = require('../../../auth/index')
const { config } = require('../../../config/index');
const jwt = require('jsonwebtoken')
//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//1.1 ( CREATE ) USER
//------------------------------------------------------------------------------------------------

const verifyRefreshToken = async (refreshToken) => {
console.log("1",refreshToken)
  if (!refreshToken) {
    throw new Error('something wrong happened 1')
  }

  const filter = {
    authenticate: refreshToken
  }

  const verifyInDatabase = await storage.verifyExists(filter)
  
  if(verifyInDatabase === false){
    throw new Error('something wrong happened 2')
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
//5.5 ( LOGIN ) USER
//------------------------------------------------------------------------------------------------

const loginUser = async (email, password) => {
  const user = await storage.getOneByFilter({ email })

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
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  verifyRefreshToken,
  loginUser,
}