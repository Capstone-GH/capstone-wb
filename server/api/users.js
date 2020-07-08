const router = require('express').Router()
var ObjectId = require('mongoose').Types.ObjectId
const {User, Project} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/projects', async (req, res, next) => {
  try {
    const currUser = await User.findById(req.user._id).populate('ownerBoards')
    res.json(currUser.ownerBoards)
  } catch (error) {
    next(error)
  }
})
