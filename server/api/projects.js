const {User, Project} = require('../db/models')
const e = require('express')
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
    // console.log(req.body)
    console.log('req.body', req.body)

    const newProject = new Project({
      whiteboardData: req.body.whiteboardData,
      owner: req.user._id,
      codeEditorData: req.body.codeEditorData,
      name: req.body.name
    })
    await newProject.save()
    //save to user
    const currUser = await User.findById(req.user._id)
    currUser.ownerBoards.push(newProject._id)
    await currUser.save()

    // console.log(newProject)
    res.send(newProject)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    console.log('updating!')
    console.log('req.body', req.body)
    if (!req.user) res.sendStatus(401)
    const projectToUpdate = await Project.findById(req.params.id)
    projectToUpdate.whiteboardData = req.body.whiteboardData
    projectToUpdate.codeEditorData = req.body.codeEditorData
    projectToUpdate.name = req.body.name
    await projectToUpdate.save()
    res.json(projectToUpdate)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    if (!req.user) res.sendStatus(401)
    await Project.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
