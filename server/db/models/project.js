const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Project = new Schema(
  {
    name: {type: String, required: true},
    codeEditorData: {type: String}
  },
  {timestamps: true}
)

module.exports = mongoose.model('projects', Project)
