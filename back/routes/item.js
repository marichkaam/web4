'use strict'

const express = require('express')
const router = express.Router()

const itemController = require('../controllers/item')

// router.get('/', shopController.index)
router.get('/list', itemController.itemList)
router.post('/add', itemController.postCreateItem)
router.post('/edit/:id', itemController.putUpdateItem)
router.post('/remove/:id', itemController.deleteItem)

module.exports = router
