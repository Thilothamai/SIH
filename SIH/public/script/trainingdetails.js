import { header, default_filter_fun,signout ,reffer} from "./common.js";

default_filter_fun();

localStorage.setItem("testpreview",JSON.stringify({}))

let headerblock = document.querySelector("header");

localStorage.setItem("searched", JSON.stringify(""));

localStorage.setItem("dailsearched", JSON.stringify(""));

header(headerblock, ".training");

let search_block = document.querySelector(".searchblock");

search_block.classList.add("hide");

let stats = document.querySelector(".stats");

let department_arr = [
  { dep: "Logical" },
  { dep: "Verbal" },
  { dep: "Aptitude" },
  {dep : "Overall"}
];

function show_stats() {
  return (stats.innerHTML = department_arr
    .map((obj) => {
      return `
            <section>
                <h3>${obj.dep}</h3>
                <div>
                    <aside class="${obj.dep.replace(" ","")}highest"></aside>
                    <h4>Highest</h4>
                </div>
                <div>
                    <aside class="${obj.dep.replace(" ","")}lowest"></aside>
                    <h4>Lowest</h4>
                </div>
                <div>
                    <aside class="${obj.dep.replace(" ","")}average"></aside>
                    <h4>Average</h4>
                </div>
            </section>`;
    })
    .join(""));
}

show_stats();

let login = JSON.parse(localStorage.getItem("login"));

let Aptitude = [];

let Verbal = [];

let Logical = [];

let Overall = []

let historyarr = []

function setstats() {
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
      historyarr.forEach((obj) => {
        if (obj.department == "Logical") {
          Logical.push(obj.score);
        } else if (obj.department == "Verbal") {
          Verbal.push(obj.score);
        } else if (obj.department == "Aptitude") {
          Aptitude.push(obj.score);
        } 
        Overall.push(obj.score)
      });
    })
    .then(() => {
      setscore(Logical, "Logical");
      setscore(Verbal, "Verbal");
      setscore(Aptitude, "Aptitude");
      setscore(Overall,"Overall")
    });
}

setstats();

function setscore(arr, department) {
  console.log("hi");
  if (arr.length != 0) {
    let max = String(Math.max(...arr));
    let min = String(Math.min(...arr));
    let avg = 0;
    arr.forEach((val) => {
      avg = avg + val;
    });
    avg = String((avg / arr.length).toFixed(1));
    document.querySelector(`.${department}highest`).innerHTML = max;
    document.querySelector(`.${department}lowest`).innerHTML = min;
    document.querySelector(`.${department}average`).innerHTML = avg;
  }
  else {
    document.querySelector(`.${department}highest`).innerHTML = "0";
    document.querySelector(`.${department}lowest`).innerHTML = "0";
    document.querySelector(`.${department}average`).innerHTML = "0";
  }
}

// let mocksub = document.querySelector(".mocksub")

// mocksub.addEventListener("click",()=>{
//   let examtype =  document.querySelector("#examtype")
//   if (examtype.value != "select") {
//     localStorage.setItem("examtype",JSON.stringify(examtype.value))
//     location.href = "/training"
//   }
// })

signout()

reffer()