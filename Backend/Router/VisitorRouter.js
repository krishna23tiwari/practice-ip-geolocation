const express = require("express");
const router = express.Router();
const Visitor = require('../Controller/VisitorController')

router.post('/track', Visitor.trackVisitor)

router.get('/test', Visitor.test)

router.get('/counts', Visitor.getCounts);

module.exports = router