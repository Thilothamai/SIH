export function header(headerblock, active) {
  headerblock.innerHTML = `
        <section class="mainheader">
        <img src="/imgs/logo.png" alt="" class="logo">

        <section class="searchblock">
          <i class="fa-solid fa-filter"></i>
          <div>
            <input type="text" id="searchbar" placeholder="Search..." />
            <i class="fa-solid fa-magnifying-glass"></i>
            <i class="fa-solid fa-microphone"></i>
          </div>
        </section>

          <nav>
            <a href="/home" class="home">Home</a>
            <a href="/jobs" class="jobs">Jobs</a>
            <a href="/trainingdetails" class="training">Mock & Stats</a>
            <a href="/about" class="about">About Us</a>
            <i class="fa-solid fa-user"></i>
          </nav>     
          </section>
          
          <section class="user hide">
            <a href="/profile"><span><i class="fa-solid fa-user-pen"></i></span> Profile</a>
            <a href="/saved"><span><i class="fa-solid fa-bookmark"></i></span> Saved Jobs</a>
            <a href="/history"><span><i class="fa-solid fa-clock-rotate-left"></i></span>Test History</a>
            <h4><span><i class="fa-solid fa-share"></i></span> Refferals</h4>
            <a href="/addtest" id="addtest" class="hide"><span><i class="fa-solid fa-share"></i></span> Add Test</a>
            <button id = "signout"><span><i class="fa-solid fa-right-from-bracket"></i></span> Sign Out </button>
        </section>
        
        <section class="jobtype hide">
            <a href="/jobs">NIEPMD</a>
            <a href="/dailjobs">DAIL</a>
            <a href="/tnpsc">Tnpsc</a>
        </section>`;

  document.querySelector(`${active}`).classList.add("active");

  let user = document.querySelector(".fa-user");

  let dropdown = document.querySelector(".user");

  user.addEventListener("click", () => {
    dropdown.classList.toggle("hide");
  });
}

export function jobdown() {
  let jobtype = document.querySelector("header .jobtype");
  let jobbutton = document.querySelector("nav .jobs");
  jobbutton.addEventListener("click", () => {
    jobtype.classList.toggle("hide");
  });
}

function under_category_arr(category) {
  fetch("/category", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      value: category,
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("jobs", JSON.stringify(data));
    })
    .then((data) => {
      location.href = "/jobs";
    });
}

function under_category_arr2(category) {
  fetch("/category2", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      value: category,
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      localStorage.setItem("dailjobs", JSON.stringify(data));
    })
    .then((data) => {
      location.href = "/dailjobs";
    });
}

let searched = JSON.parse(localStorage.getItem("searched"));

let dailsearched = JSON.parse(localStorage.getItem("dailsearched"));

export function search() {
  let searchbox = document.querySelector("#searchbar");
  let searchbutton = document.querySelector(".searchblock div .fa-magnifying-glass");
  searchbox.value = searched;
  searchbox.addEventListener("keyup", () => {
    if (searchbox.value == "") {
      localStorage.setItem("searched", JSON.stringify(""));
      localStorage.setItem("jobs", JSON.stringify([]));
      default_filter_fun();
      location.href = "/jobs";
    }
  });
  searchbutton.addEventListener("click", () => {
    default_filter_fun();
    let input = String(searchbox.value).toLowerCase();
    localStorage.setItem("searched", JSON.stringify(searchbox.value));
    under_category_arr(input);
  });
}

export function search2() {
  let searchbox = document.querySelector("#searchbar");
  let searchbutton = document.querySelector(".searchblock div i");
  searchbox.value = dailsearched;
  searchbox.addEventListener("keyup", () => {
    if (searchbox.value == "") {
      localStorage.setItem("dailsearched", JSON.stringify(""));
      localStorage.setItem("dailjobs", JSON.stringify([]));
      location.href = "/dailjobs";
    }
  });
  searchbutton.addEventListener("click", () => {
    let input = String(searchbox.value).toLowerCase();
    localStorage.setItem("dailsearched", JSON.stringify(searchbox.value));
    under_category_arr2(input);
  });
}

export let default_filter = {
  lastdate: "Default",
};

export function default_filter_fun() {
  localStorage.setItem("jobs", JSON.stringify([]));
  localStorage.setItem("dailjobs", JSON.stringify([]));
  localStorage.setItem("default_filter", JSON.stringify(default_filter));
}

export function apply_filter() {
  let apply = document.querySelector(".filterapplybutton");
  apply.addEventListener("click", () => {
    let deafault_filter = {
      lastdate: document.querySelector("#Lastdate").value,
    };
    localStorage.setItem("default_filter", JSON.stringify(deafault_filter));
    filtering();
    location.href = "/jobs";
  });
}

function filtering() {
  let data = JSON.parse(localStorage.getItem("default_filter"));
  let alljobs = JSON.parse(localStorage.getItem("alljobs"));
  if (data.lastdate != "Default") {
    switch (data.lastdate) {
      case "Live": {
        alljobs = alljobs.filter((obj) => {
          let d1 = new Date("2023/10/11");
          let d2 = obj.LastDate;
          let arr = d2.split("/");
          let temp = arr[0];
          arr[0] = arr[2];
          arr[2] = temp;
          d2 = new Date(arr.join("/"));
          return d1 <= d2;
        });
        break;
      }

      case "Expired": {
        alljobs = alljobs.filter((obj) => {
          let d1 = new Date("2023/10/11");
          let d2 = obj.LastDate;
          let arr = d2.split("/");
          let temp = arr[0];
          arr[0] = arr[2];
          arr[2] = temp;
          d2 = new Date(arr.join("/"));
          return d2 <= d1;
        });
        break;
      }

      case "All": {
        alljobs = alljobs.filter((obj) => {
          return obj.show != "2";
        });
        break;
      }
    }
  }
  localStorage.setItem("jobs", JSON.stringify(alljobs));
}

export function save() {
  let savebutton = document.querySelectorAll(".savebutton");

  savebutton.forEach((button) => {
    button.addEventListener("click", () => {
      let id = button.parentElement.getAttribute("id");
      let saved = JSON.parse(localStorage.getItem("saved"));
      let result = saved.some((obj) => {
        return obj._id === id;
      });
      if (result) {
        confirm("Already added to saved");
      } else {
        fetch("/save", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            email: JSON.parse(localStorage.getItem("login")).email,
          }),
        })
          .then((data) => {
            return data.json();
          })
          .then((data) => {
            saved.push(data);
            if (saved[0] == null) {
              saved = [];
            }
            localStorage.setItem("saved", JSON.stringify(saved));
          });
      }
    });
  });
}

export function unsave() {
  let savebutton = document.querySelectorAll(".unsavebutton");

  savebutton.forEach((button) => {
    button.addEventListener("click", () => {
      let id = button.parentElement.getAttribute("id");
      let saved = JSON.parse(localStorage.getItem("saved"));
      fetch("/unsave", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          email: JSON.parse(localStorage.getItem("login")).email,
        }),
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          let index = saved.findIndex((obj) => {
            return obj._id == data._id;
          });
          saved.splice(index, 1);
          if (saved[0] == null) {
            saved = [];
          }
          localStorage.setItem("saved", JSON.stringify(saved));
        })
        .then(() => {
          location.href = "/saved";
        });
    });
  });
}

export function checkadmin(email) {
  let admins = ["devmadhujith@gmail.com"];
  if (admins.includes(email)) {
    document.querySelector("#addtest").classList.remove("hide")
    return true;
  } else {
    return false;
  }
}

export function signout() {
  let signout_button = document.querySelector("#signout");
  signout_button.addEventListener("click", () => {
    localStorage.setItem(
      "login",
      JSON.stringify({
        email: "",
        otp: "",
        phno: "",
      })
    );
    location.href = "/signin";
  });
}

export function reffer() {
  let refferbutton = document.querySelector(".user h4");
  let login = JSON.parse(localStorage.getItem("login"))
  let user = login.email
  refferbutton.addEventListener("click", () => {
    let email = prompt("Enter the refferal email : ");
    let msg =
      "Udyog Sarathi: Empowering disability employment. Find tailored jobs easily. Join our inclusive workforce. Unlock your potential today! Visit [YourURLHere]. #Inclusivity #UdyogSarathi #EmploymentForAll";
    fetch("/sendemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        msg: msg,
      }),
    });
    fetch("/shareemails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        msg : msg,
        user : user,
        jobid : null
      }),
    });
    if (email != null && email.includes("@gmail.com")) {
      alert("Successfully sent")
    }
  });
}