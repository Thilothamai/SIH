let mongoose = require("mongoose")

let model = new mongoose.Schema({
  email: String,
  user : String
})

module.exports = mongoose.model("subscribes",model)