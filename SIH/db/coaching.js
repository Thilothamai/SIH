let mongoose = require("mongoose")

let model = new mongoose.Schema({
    name  : String,
    location : String,
    courses : Array
})

module.exports = mongoose.model("coachingcenters",model)