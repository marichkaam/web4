const Project = require('../models/model_project')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const project = new project({
    name: data.name,
    address: data.address,
    capacity: data.capacity,
  })

  return new Promise((resolve, reject) => {
    project.save(function (err, createdproject) {
      if (err) {
        reject(err)
      } else {
        resolve(createdproject)
      }
    })
  })
}
