import {login,back_to_field} from "./login.js"

let url = "/forget"

login(url)

let err = document.querySelector(".error")

let inputs = document.querySelectorAll("input")

back_to_field(inputs,err)