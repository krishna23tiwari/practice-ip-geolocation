const express = require("express");
const router = express.Router();
const Visitor = require('../Controller/VisitorController')

router.post('/track', Visitor.trackVisitor)

router.get('/test', Visitor.test)

module.exports = router