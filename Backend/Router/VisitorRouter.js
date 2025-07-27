const express = require("express");
const router = express.Router();
const Visitor = require('../Controller/VisitorController')

router.post('/track', Visitor.track)

module.exports = router