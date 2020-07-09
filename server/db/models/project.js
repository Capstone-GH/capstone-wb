const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Project = new Schema(
  {
    name: {type: String, default: 'Untitled'},
    whiteboardData: {type: Array},
    codeEditorData: {type: String},
    owner: {type: Schema.Types.ObjectId, ref: 'users'}
  },
  {timestamps: true}
)

module.exports = mongoose.model('projects', Project)
