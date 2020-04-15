const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {

    try {
        const token = req.headers.authentication.split(' ')[1]
        const user = jwt.verify(token, 'abcd1234')
        next()
        // res.send(token)
    } catch(e) {
        res.status(401).json({
            msg: 'Not Authorized.'
        })
    }
    
}

module.exports = auth