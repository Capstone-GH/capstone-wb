// const pkg = require('../../package.json')
// const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

// const db = new Sequelize(
//   process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
//   {
//     logging: false
//   }
// )
const connectionString =
  process.env.mongo_DB || require('../../secrets').connectionString

//Import the mongoose module
const mongoose = require('mongoose')

//Set up default mongoose connection
const mongoDB = connectionString

mongoose.connect(mongoDB, {useNewUrlParser: true})

//Get the default connection
const db = mongoose.connection

module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
// if (process.env.NODE_ENV === 'test') {
//   after('close database connection', () => db.close())
// }
