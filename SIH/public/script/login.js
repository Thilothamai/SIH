export function login(url) {
  let phno = document.querySelector(".phno input");

  let email = document.querySelector(".email input");

  let pass = document.querySelector(".password input");

  let err = document.querySelector(".error");

  let submit = document.querySelector("button");

  let details = {
    name: "",
    udid: "",
    district: "",
    pincode: "",
    state: "",
    gdemail: "",
    gdphno: "",
    gender: "",
    income: "",
    empstatus: "",
    qualification: "",
    distype: "",
  };

  let answers = {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  };

  submit.addEventListener("click", () => {
    let data;

    if (url == "/signin") {
      data = {
        email: email.value,
        pass: pass.value,
      };
    } else if (url == "/signup") {
      localStorage.setItem("saved", JSON.stringify([]));
      localStorage.setItem("details", JSON.stringify(details));
      localStorage.setItem("jobs", JSON.stringify([]));
      localStorage.setItem("dailjobs", JSON.stringify([]));
      localStorage.setItem(
        "department",
        "DepartmentOfSpeechHearingCommunicationQuiz"
      );
      localStorage.setItem("answers", JSON.stringify(answers));
      localStorage.setItem("testpreview", JSON.stringify({}));
      data = {
        email: email.value,
        pass: pass.value,
        phno: phno.value,
        others: details,
      };
    } else {
      data = {
        email: email.value,
      };
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.value) {
          if (data.data) {
            localStorage.setItem("login", JSON.stringify(data.data));
            if (url == "/signin") {
              fetch("/getdetails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email : JSON.parse(localStorage.getItem("login")).email
              }),
            })
              .then((data) => {
                return data.json();
              })
              .then((data)=>{
                localStorage.setItem("details", JSON.stringify(data));
              })
              .then(()=>{
                location.href = data.nextpage;
              })
            }
            else {
              location.href = data.nextpage;
            }
          }
          if (data.verify) {
            let userdata = JSON.parse(localStorage.getItem("login"));
            userdata.otp = data.verify.otp;
            localStorage.setItem("login", JSON.stringify(userdata));
            location.href = data.nextpage;
          }
        } else {
          err.classList.remove("hide");
        }
      });
  });
}

export function back_to_field(inputs, err) {
  inputs.forEach((input) => {
    input.addEventListener("click", () => {
      err.classList.add("hide");
    });
  });
}

export function show_password(icon) {
  icon.addEventListener("click", () => {
    let password = document.querySelector(".password input");
    let type = password.getAttribute("type");
    if (type == "password") {
      password.setAttribute("type", "text");
    } else {
      password.setAttribute("type", "password");
    }
  });
}

export function apply() {
  let apply = document.querySelector("p a");

  apply.addEventListener("click", () => {
    let ok = confirm("Do you want to continue for registration ?");
    if (ok) {
      location.href = "/jobregistration";
    }
  });
}
