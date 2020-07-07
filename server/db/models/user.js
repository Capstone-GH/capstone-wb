const crypto = require('crypto')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
  {
    email: {type: String, required: true},
    password: {type: String, required: true},
    salt: {type: String},
    googleId: {type: String}
  },
  {timestamps: true}
)

User.methods.correctPassword = function(candidatePwd) {
  return User.statics.encryptPassword(candidatePwd, this.salt) === this.password
}

User.statics.generateSalt = function generateSalt() {
  return crypto.randomBytes(16).toString('base64')
}

User.statics.encryptPassword = function encryptPassword(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

User.pre('save', function(next) {
  const user = this

  if (!user.isModified('password')) return next()

  user.salt = User.statics.generateSalt()
  user.password = User.statics.encryptPassword(user.password, user.salt)

  next()
})

// const User = db.define('user', {
//   email: {
//     type: Sequelize.STRING,
//     unique: true,
//     allowNull: false
//   },
//   password: {
//     type: Sequelize.STRING,
//     // Making `.password` act like a func hides it when serializing to JSON.
//     // This is a hack to get around Sequelize's lack of a "private" option.
//     get() {
//       return () => this.getDataValue('password')
//     }
//   },
//   salt: {
//     type: Sequelize.STRING,
//     // Making `.salt` act like a function hides it when serializing to JSON.
//     // This is a hack to get around Sequelize's lack of a "private" option.
//     get() {
//       return () => this.getDataValue('salt')
//     }
//   },
//   googleId: {
//     type: Sequelize.STRING
//   }
// })

module.exports = mongoose.model('users', User)
