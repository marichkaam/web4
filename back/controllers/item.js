'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const itemAllService = require('../services/item.all')
const itemCreateService = require('../services/item.create')
const itemByIdService = require('../services/item.byId')
const itemUpdateService = require('../services/item.update')
const itemDeleteService = require('../services/item.delete')

module.exports = {
  itemList (req, res) {
    itemAllService()
      .then(itemList => {
        res.json(itemList)
      })
      .catch(error => {
        res.status(500)
        // res.json({ errors: [{ msg: error.message }] })
      })
  },
  postCreateItem: [
    (req, res) => {
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        itemCreateService(req.body)
          .then(item => {
            res.json(item)
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
  putUpdateItem: [
    (req, res, next) => {
      const itemData = req.body
      const itemId = req.params.id

      const errors = validationResult(req)
      if (errors.isEmpty()) {
        itemByIdService(itemId)
          .then(item => {
            if (item) {
              return itemUpdateService({...itemData, id: itemId})
            } else {
              res.status(404)
              res.json([{ errors: [ { msg: 'Not found' } ] }])
            }
          })
          .then(item => {
            res.json(item)
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
  deleteItem (req, res, next) {
    const itemId = req.params.id

    itemByIdService(itemId)
      .then(item => {
        if (item) {
          return itemDeleteService({...item, id: itemId})
        } else {
          res.status(404)
          res.json([{ errors: [ { msg: 'Not found' } ] }])
        }
      })
      .then(item => {
        res.json(item)
      })
      .catch(error => {
        res.status(422)
        res.json({ errors: [{ msg: error.message}] })
      })
  }
}
