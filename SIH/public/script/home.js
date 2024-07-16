import {header,default_filter_fun,signout,reffer} from "./common.js"

default_filter_fun()

localStorage.setItem("testpreview",JSON.stringify({}))

let headerblock = document.querySelector("header")

header(headerblock,".home")

let search_block = document.querySelector(".searchblock")

search_block.classList.add("hide")

localStorage.setItem("searched",JSON.stringify(""))

localStorage.setItem("dailsearched",JSON.stringify(""));

let left = document.querySelector(".fa-less-than")

let right = document.querySelector(".fa-greater-than")

let slider = document.querySelector(".slider")

left.addEventListener("click",()=>{
    slider.scrollLeft -= 400
})

right.addEventListener("click",()=>{
    slider.scrollLeft += 400
})


let up = document.querySelector("footer i")

up.addEventListener("click",()=>{
    scrollTo(0,0)
})

let login = JSON.parse(localStorage.getItem("login"));

fetch("/loadsaved", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: login.email,
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      localStorage.setItem("saved",JSON.stringify(data))
    })

  signout()

reffer()