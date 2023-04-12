'use strict'

const express = require('express')
const router = express.Router()

const shopController = require('../controllers/shop')

// router.get('/', shopController.index)
router.get('/list', shopController.shopList)
router.post('/add', shopController.postCreateShop)
router.post('/edit/:id', shopController.putUpdateShop)
router.post('/remove/:id', shopController.deleteShop)

module.exports = router
