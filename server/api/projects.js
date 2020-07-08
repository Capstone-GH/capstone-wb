const Project = require('../db/models/project')
const {findByIdAndUpdate} = require('../db/models/project')
const router = require('express').Router()

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
