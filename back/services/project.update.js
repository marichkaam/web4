const Project = require('../models/model_project')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const projectData = {
    name: data.name,
    address: data.address,
    capacity: data.capacity,
  }

  return new Promise((resolve, reject) => {
    Project.findByIdAndUpdate(
      data.id,
      { $set: projectData },
      { new: true },
      function (err, updatedLocationType) {
        if (err) {
          reject(err)
        } else {
          resolve(updatedLocationType)
        }
      })
  })
}
