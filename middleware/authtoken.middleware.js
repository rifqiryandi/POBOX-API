//*jsonwebtoken
const jwt = require('jsonwebtoken')
require('dotenv').config()

// ! Middleware
function authToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({
            'responCode': 401,
            'Msg': "Unauthorized"
        }) //Unauthorized
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({
                'responCode': 403,
                'Msg': "Forbidden"
            }) //Forbidden
        req.user = user
        next()
    })
}

module.exports = { authToken }