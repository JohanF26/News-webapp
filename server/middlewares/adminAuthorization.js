const jwt = require('jsonwebtoken')

const adminAuth = (req, res, next) => {

    try {
        const token = req.headers.authentication.split(' ')[1]
        const user = jwt.verify(token, 'abcd1234')
        if(user.isAdmin){
            next()
        } else {
            res.status(401).json({
                msg: 'Not Authorized.'
            })
        }
        
        // res.send(token)
    } catch(e) {
        res.status(401).json({
            msg: 'Not Authorized.'
        })
    }
    
}

module.exports = adminAuth