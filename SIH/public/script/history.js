import { header, default_filter_fun,signout ,reffer} from "./common.js";

default_filter_fun();

localStorage.setItem("testpreview",JSON.stringify({}))

let headerblock = document.querySelector("header");

localStorage.setItem("searched", JSON.stringify(""));

localStorage.setItem("dailsearched", JSON.stringify(""));

header(headerblock, ".fa-user");

let search_block = document.querySelector(".searchblock")

search_block.classList.add("hide")

let login = JSON.parse(localStorage.getItem("login"));

let historyarr = [];

fetch("/history", {
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
    historyarr = data;
    showhistory();
  })
  .then(() => {
    let previews = document.querySelectorAll(".preview");
    previews.forEach((preview)=>{
      preview.addEventListener("click", ()=>{
        fetch("/findhistory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: login.email,
            date: preview.getAttribute("id"),
          }),
        })
          .then((data) => {
            return data.json();
          })
          .then((data) => {
            localStorage.setItem("testpreview", JSON.stringify(data));
          })
          .then(()=>{
            location.href = "/training";
          })
      })
    })
  });

let main = document.querySelector("main");

function showhistory() {
  return (main.innerHTML = historyarr
    .map((obj) => {
      return `<section>
      <div>
        <h4>Department : </h4>
        <p>${obj.department}</p>
      </div>
      <div>
        <h4>Score / 10 : </h4>
        <p>${obj.score}</p>
      </div>
      <div>
        <h4>Date : </h4>
        <p>${obj.date}</p>
      </div>
      <div class="buttons">
        <button id="${obj.date}" class="preview">Preview <i class="fa-solid fa-arrow-right"></i></button>
      </div>
    </section>`;
    })
    .join(""));
}

signout()

reffer()