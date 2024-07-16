let mongoose = require("mongoose")

let model = new mongoose.Schema({
  disabilitytype : String,
    questions : Array
})

module.exports = mongoose.model("disabilities",model);