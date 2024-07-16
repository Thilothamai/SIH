import {header,default_filter_fun,signout,reffer} from "./common.js"

default_filter_fun();

localStorage.setItem("testpreview",JSON.stringify({}))

let headerblock = document.querySelector("header");

localStorage.setItem("searched",JSON.stringify(""))

localStorage.setItem("dailsearched",JSON.stringify(""))

header(headerblock,".about");

let search_block = document.querySelector(".searchblock")

search_block.classList.add("hide")

signout()

reffer()