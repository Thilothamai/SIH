import { header,unsave,default_filter_fun,signout,reffer} from "./common.js";

let headerblock = document.querySelector("header");

localStorage.setItem("dailsearched",JSON.stringify(""))

header(headerblock, ".fa-user");

let search_block = document.querySelector(".searchblock")

search_block.classList.add("hide")

let saved = JSON.parse(localStorage.getItem("saved"))

let main = document.querySelector("main");

default_filter_fun()

localStorage.setItem("testpreview",JSON.stringify({}))

function jobs(data) {
  return (main.innerHTML = saved
    .map((obj) => {
      if (obj.Qualification == undefined) {
        return `<section class="box">
        <div>
          <h4>Role : </h4>
          <p>${obj.name}</p>
        </div>
        <div>
          <h4>Announced : </h4>
          <p>${obj.date}</p>
        </div>
        <div>
          <h4>DeadLine : </h4>
          <p>${obj.lastdate}</p>
        </div>
        <div id="${obj._id}" class="apply buttons">
          <a href="${obj.link}" target="_blank"><button>PDF <i class="fa-solid fa-download"></i></button></a>
          <a href=""><button>Apply <i class="fa-solid fa-arrow-right"></i></button></a>
          <button class="unsavebutton">Unsave <i class="fa-solid fa-bookmark"></i></button>
        </div>
      </section>`
      }
      else {
      return `<section class="box">
          <div>
            <h4>Role : </h4>
            <p>${obj.Name}</p>
          </div>
          <div class="hide">
            <h4>Qualification : </h4>
            <p>${obj.Qualification}</p>
          </div>
          <div class="hide">
            <h4>Remuneration : </h4>
            <p>${obj.Remuneration}</p>
          </div>
          <div>
            <h4>Vacancies : </h4>
            <p>${obj.Vacancy}</p>
          </div>
          <div class="hide">
            <h4>Adv no : </h4>
            <p>${obj.AdvNo}</p>
          </div>
          <div class="hide">
            <h4>Announced : </h4>
            <p>${obj.Date}</p>
          </div>
          <div>
            <h4>DeadLine : </h4>
            <p>${obj.LastDate}</p>
          </div>
          <div id="${obj._id}" class="apply buttons">
            <a href="${obj.Link}" target="_blank"><button>PDF <i class="fa-solid fa-download"></i></button></a>
            <a href=""><button>Apply <i class="fa-solid fa-arrow-right"></i></button></a>
            <button class="unsavebutton">Unsave <i class="fa-solid fa-bookmark"></i></button>
          </div>
        </section>`
      };
    })
    .join(""));
}

Promise.resolve(jobs()).then(()=>{
  unsave()
})

signout()

reffer()