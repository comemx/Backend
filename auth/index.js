const { config } = require('../config/index');
const jwt = require('jsonwebtoken')

const createToken = (id, email, username) => {
  const token = jwt.sign({ id, email, username}, `${config.secret}` || 'gp*)e5?$[sin8~4v]9', {
    expiresIn: 60
  })

  return token
}

module.exports = {
  createToken
}