document.addEventListener("DOMContentLoaded", function () {
    currentTimestamp();
    setInterval(currentTimestamp, 60000);

});
function currentTimestamp() {
    console.log(new Date());
    var date = new Date();
    const daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    document.getElementById("displayDateTime").innerText = daylist[date.getDay()]
        + " " + monthNames[date.getMonth()] + " " + date.getDate() + " "
        + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
}
function getRegisData() {
    let fname = document.getElementsByName("fName")[0].value;
    let lname = document.getElementsByName("lName")[0].value;
    let address = document.getElementsByName("address")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let age = document.getElementsByName("age")[0].value;
    let pass = true;
    if (fname === "") {
        document.getElementById("errorf").innerText = "First Name cann't be empty";
        document.getElementById("errorf").style.display = "block";
        document.getElementById("errorf").style.color = "red";
        pass = false;
    } if (lname === "") {
        document.getElementById("errorl").innerText = "Last Name cann't be empty";
        document.getElementById("errorl").style.display = "block";
        document.getElementById("errorl").style.color = "red";
        pass = false;
    } if (Checkemail()) {
        if (pass) {
            let empReg = {
                'firstname': fname,
                'lastname': lname,
                'email': email,
                'address': address,
                'age': age
            }
            var duplicated = false;
            Employees = [];
            Employees = JSON.parse(localStorage.getItem('Requests')) || [];
            Employees.forEach(element => {
                if (element['email'] === email) {
                    duplicated = true;
                    return;
                }
            });
            if (!duplicated) {
                Employees.push(empReg);
                localStorage.setItem('Requests', JSON.stringify(Employees))
            } else {
                errorSpan3 = document.getElementById("errormsg3");
                errorSpan3.innerText = "This Email already exist";
                errorSpan3.style.color = "red";
                errorSpan3.style.display = "block";
                pass = false;
            }
        }
    } else {
        pass = false;
    }
}
function Checkemail() {
    emailAddr = document.getElementsByName("email")[0];
    errorSpan2 = document.getElementById("errormsg2");
    if (!((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(emailAddr.value))) {
        errorSpan2.innerText = "Not Valid Email";
        errorSpan2.style.color = "red";
        flagMailV = false;
    }
    else {
        errorSpan2.innerText = "";
        flagMailV = true;
    }
    return flagMailV;
}