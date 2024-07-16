let mongoose = require("mongoose")

let model = new mongoose.Schema({
    name : String,
    link : String,
    date : String,
    lastdate : String,
    HashValue : String,
    show : String
})

module.exports = mongoose.model("channel2",model);