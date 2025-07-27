const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  ip: String,
  location: {
    country: String,
    region: String,
    city: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {timestamps : true, versionKey : false});

module.exports = mongoose.model("Visitor", visitorSchema);
