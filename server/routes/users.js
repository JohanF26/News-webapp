const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.post('/login', (req,res) => {
    const { email, password } = req.body

    User.findOne({email})
        .then(user => {
            if(user){
                if(user.comparePassword(password)) {
                    res.json(user.generateUserObject())
                } else{
                    res.status(401).json({ msg: 'Invalid Credentials.' })
                }
            } else{
                res.status(401).json({ msg: 'Invalid Credentials.' })
            }
        })
        .catch(err => res.status(400).json(err))
})

router.post('/register', (req, res) => {
    const { name, email, password } = req.body

    User.findOne({email: email})
        .exec()
        .then(user => {
            if(user) {
                res.status(409).json({
                    msg: 'An account with this email already exists.'
                })
            } else{
                const user = new User()

                user.name = name
                user.email = email
                user.generatePasswordHash(password)

                user.save()
                    .then(newUser => {
                        res.json(newUser.generateUserObject())
                    })
                    .catch(err => {
                        res.status(400).json(err)
                    })
            }
        })
})

module.exports = router