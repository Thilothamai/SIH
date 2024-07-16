import {
  header,
  search,
  jobdown,
  save,
  checkadmin,
  signout,
  reffer,
} from "./common.js";

localStorage.setItem("testpreview", JSON.stringify({}));

let headerblock = document.querySelector("header");

localStorage.setItem("dailsearched", JSON.stringify(""));

let login = JSON.parse(localStorage.getItem("login"));

header(headerblock, ".jobs");

search();

function fetchJobs() {
  fetch("/tnpscjobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      jobs(data);
    });
}

let main = document.querySelector("main");

function jobs(data) {
  return (main.innerHTML = data
    .map((obj) => {
      return `<section class="box">
          <div>
            <h4>Role: </h4>
            <p>${obj.post_name}</p>
          </div>
          <div>
            <h4>Announced : </h4>
            <p>${obj.app_start_date}</p>
          </div>
          <div>
            <h4>DeadLine: </h4>
            <p>${obj.app_end_date}</p>
          </div>
          <div id="${obj._id}" class="apply buttons">
            <a href="${obj.notification_link}" target="_blank"><button>PDF <i class="fa-solid fa-download"></i></button></a>
            <button id="button${obj._id}" class="applybutton">Apply <i class="fa-solid fa-arrow-right"></i></button>
            <button class="savebutton">Save <i class="fa-solid fa-bookmark"></i></button>
            <button id="${obj._id}" class="share">Share <i class="fa-solid fa-share"></i></button>
            <button class="deletebutton hide">Delete <i class="fa-solid fa-trash"></i></button>
          </div>
        </section>`;
    })
    .join(""));
}

fetchJobs();

jobdown();

signout();
