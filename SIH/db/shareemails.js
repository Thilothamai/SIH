let mongoose = require("mongoose")

let model = new mongoose.Schema({
  email: String,
  msg : String,
  user : String,
  jobid : String
})

module.exports = mongoose.model("shareemails",model)