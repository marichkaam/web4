'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const projectAllService = require('../services/project.all')
const projectCreateService = require('../services/project.create')
const projectByIdService = require('../services/project.byId')
const projectUpdateService = require('../services/project.update')
const projectDeleteService = require('../services/project.delete')

module.exports = {
  projectList (req, res) {
    projectAllService()
      .then(projectList => {
        res.json(projectList)
      })
      .catch(error => {
        res.status(500)
        // res.json({ errors: [{ msg: error.message }] })
      })
  },
  postCreateproject: [
    (req, res) => {
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        projectCreateService(req.body)
          .then(project => {
            res.json(project)
          })
          .catch(error => {
            res.status(422)
            res.json({ errors: [{ msg: error.message }] })
          })
      } else {
        res.status(422)
        res.json({ errors: errors.array() })
      }
    }
  ],
  putUpdateproject: [
    (req, res, next) => {
      const projectData = req.body
      const projectId = req.params.id

      const errors = validationResult(req)
      if (errors.isEmpty()) {
        projectByIdService(projectId)
          .then(project => {
            if (project) {
              return projectUpdateService({...projectData, id: projectId})
            } else {
              res.status(404)
              res.json([{ errors: [ { msg: 'Not found' } ] }])
            }
          })
          .then(project => {
            res.json(project)
          })
          .catch(error => {
            res.status(422)
            res.json({ errors: [{ msg: error.message }] })
          })
      } else {
        res.status(422)
        res.json({ errors: errors.array() })
      }
    }
  ],
  deleteproject (req, res, next) {
    const projectId = req.params.id

    projectByIdService(projectId)
      .then(project => {
        if (project) {
          return projectDeleteService({...project, id: projectId})
        } else {
          res.status(404)
          res.json([{ errors: [ { msg: 'Not found' } ] }])
        }
      })
      .then(project => {
        res.json(project)
      })
      .catch(error => {
        res.status(422)
        res.json({ errors: [{ msg: error.message}] })
      })
  }
}
