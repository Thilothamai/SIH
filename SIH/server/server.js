let express = require("express")

let mongoose = require("mongoose")

mongoose.connect("mongodb+srv://madhu:mmadhu@cluster0.xqcxbui.mongodb.net/test")

let cors = require("cors")

let login_route = require("./router.js")

let server = express()

server.use(cors())

server.use(express.json())

server.use(express.urlencoded());

server.use(express.static("/sih"));

server.use("/",login_route)

server.listen(5500,()=>{
  console.log("connected")
})