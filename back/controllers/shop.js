'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const shopAllService = require('../services/shop.all')
const shopCreateService = require('../services/shop.create')
const shopByIdService = require('../services/shop.byId')
const shopUpdateService = require('../services/shop.update')
const shopDeleteService = require('../services/shop.delete')

module.exports = {
  shopList (req, res) {
    shopAllService()
      .then(shopList => {
        res.json(shopList)
      })
      .catch(error => {
        res.status(500)
        // res.json({ errors: [{ msg: error.message }] })
      })
  },
  postCreateShop: [
    (req, res) => {
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        shopCreateService(req.body)
          .then(shop => {
            res.json(shop)
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
  putUpdateShop: [
    (req, res, next) => {
      const shopData = req.body
      const shopId = req.params.id

      const errors = validationResult(req)
      if (errors.isEmpty()) {
        shopByIdService(shopId)
          .then(shop => {
            if (shop) {
              return shopUpdateService({...shopData, id: shopId})
            } else {
              res.status(404)
              res.json([{ errors: [ { msg: 'Not found' } ] }])
            }
          })
          .then(shop => {
            res.json(shop)
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
  deleteShop (req, res, next) {
    const shopId = req.params.id

    shopByIdService(shopId)
      .then(shop => {
        if (shop) {
          return shopDeleteService({...shop, id: shopId})
        } else {
          res.status(404)
          res.json([{ errors: [ { msg: 'Not found' } ] }])
        }
      })
      .then(shop => {
        res.json(shop)
      })
      .catch(error => {
        res.status(422)
        res.json({ errors: [{ msg: error.message}] })
      })
  }
}
