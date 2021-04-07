const { config } = require('../config/index');
const jwt = require('jsonwebtoken')

const createAccessToken = (id, email, fullname) => {
  const accessToken = jwt.sign({ id, email, fullname}, `${config.access_token_secret}` ,{
    expiresIn: '24h'
  })

  return accessToken
}

const createRefreshToken = (id, email, fullname) => {
  const refreshToken = jwt.sign({ id, email, fullname}, `${config.refresh_token_secret}`)

  return refreshToken
}

module.exports = {
  createAccessToken,
  createRefreshToken
}