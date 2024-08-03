const express = require('express')
const messageRouter = require('./messageRouter')

const router = express.Router();

router.use(messageRouter);

module.exports = router;