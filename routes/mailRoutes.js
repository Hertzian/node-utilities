const express = require('express')
const router = express.Router()
const mailsController = require('../controllers/mailsController')

router.get('/', mailsController.acmeView)
router.post('/send', mailsController.acmeFormSend)

module.exports = router
