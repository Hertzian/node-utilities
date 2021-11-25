const express = require('express')
const router = express.Router()
const imagesController = require('../controllers/imagesController')

router.get('/', imagesController.uploadForm)
router.post('/upload', imagesController.uploadAction)

module.exports = router
