const Project = require('../db/models/project')
const {findByIdAndUpdate} = require('../db/models/project')
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
    console.log(req.body.linePoints)

    const newProject = new Project({
      whiteboardData: req.body.linePoints
    })
    await newProject.save()

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
    await projectToUpdate.save()
    res.json(projectToUpdate)
  } catch (error) {
    next(error)
  }
})

module.exports = router
