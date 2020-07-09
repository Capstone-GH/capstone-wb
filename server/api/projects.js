const {User, Project} = require('../db/models')
const router = require('express').Router()

router.get('/:id', async (req, res, next) => {
  try {
    const singleProject = await Project.findById(req.params.id)
    if (singleProject) {
      res.json(singleProject)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!req.user) res.sendStatus(401)
    // console.log(req.body.linePoints)
    console.log(req.body)
    const newProject = new Project({
      whiteboardData: req.body.linePoints,
      owner: req.user._id,
      codeEditorData: req.body.codeEditorData
    })
    await newProject.save()
    //save to user
    const currUser = await User.findById(req.user._id)
    currUser.ownerBoards.push(newProject._id)
    await currUser.save()

    console.log(newProject)
    res.send(newProject)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    console.log('updating!')
    if (!req.user) res.sendStatus(401)
    const projectToUpdate = await Project.findById(req.params.id)
    projectToUpdate.whiteboardData = req.body.linePoints
    projectToUpdate.codeEditorData = req.body.codeEditorData
    await projectToUpdate.save()
    res.json(projectToUpdate)
  } catch (error) {
    next(error)
  }
})

module.exports = router
