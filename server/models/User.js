const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
})

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.generateToken = function() {
    const payload = {
        name: this.name,
        email: this.email,
        isAdmin: this.isAdmin
    }

    const token = jwt.sign(payload, 'abcd1234')

    return token
}

UserSchema.methods.generateUserObject = function() {
    return {
        name: this.name,
        email: this.email,
        isAdmin: this.isAdmin,
        token: this.generateToken()
    }
}

UserSchema.methods.generatePasswordHash = function(password) {
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)

    this.password = passwordHash
}

const User = mongoose.model('User', UserSchema)

module.exports = User