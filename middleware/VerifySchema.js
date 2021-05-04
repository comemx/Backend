const { config } = require('../config/index');
const response = require('../network/response')

module.exports = (req, res, next) => {

    /* const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, `${config.access_token_secret}`)
    req.userData = decoded */
    
    const data = req.body
    if (data.fullname.length > 20) {
        response.error(req, res, 'Auth failed', 401, error)
    } else {
        
    }
    
    next()
}
