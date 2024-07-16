import { header,search2,jobdown,save,checkadmin,signout,reffer} from "./common.js";

localStorage.setItem("testpreview",JSON.stringify({}))

localStorage.setItem("testpreview",JSON.stringify({}))

let login = JSON.parse(localStorage.getItem("login"));

let headerblock = document.querySelector("header");

header(headerblock, ".jobs");

search2()

let filter = document.querySelector(".fa-filter")

filter.classList.add("hide")

localStorage.setItem("searched",JSON.stringify(""))

let searched_jobs = JSON.parse(localStorage.getItem("dailjobs"))

let searched = String(JSON.parse(localStorage.getItem("dailsearched")))

fetch("/dailalljobs", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    localStorage.setItem("dailalljobs", JSON.stringify(data));
  })

function fetchJobs() {

  if (searched_jobs.length != 0 || searched.length != 0 ) {
    jobs(searched_jobs)
  }
else{
  fetch("/dailjobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      localStorage.setItem("dailalljobs",JSON.stringify(data))
      jobs(data);
    })
    .then(()=>{
      save()
    })
    .then(()=>{
      let admin = checkadmin(login.email);
        if (admin) {
          let deletebuttons = document.querySelectorAll(".deletebutton");
          deletebuttons.forEach((button) => {
            button.classList.remove("hide");
          });
        }
    })
    .then(()=>{
      deletedailjob()
    })
  }
}

let main = document.querySelector("main");

function jobs(data) {
  return (main.innerHTML = data
    .map((obj) => {
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
            <a href="https://niepmd.tn.nic.in/dail_vacancy.php"><button>Apply <i class="fa-solid fa-arrow-right"></i></button></a>
            <button class="savebutton">Save <i class="fa-solid fa-bookmark"></i></button>
            <button class="deletebutton hide">Delete <i class="fa-solid fa-trash"></i></button>
          </div>
        </section>`;
    })
    .join(""));
}

fetchJobs();

jobdown()

function deletedailjob() {
  let deletebuttons = document.querySelectorAll(".deletebutton");
  deletebuttons.forEach((button) => {
    button.addEventListener("click", () => {
      fetch("/deletedailjob", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          id : button.parentElement.getAttribute("id")
        })
      })
      .then(()=>{
        location.href = "/dailjobs"
      })
    });
  });
}

signout()

reffer()