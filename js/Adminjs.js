currentTimestamp();
GetNumberofRequests();
setInterval(currentTimestamp, 60000);
setInterval(GetNumberofRequests, 20000);
var AllEmpshown = true;
var lateReportshown = false;
var isTableshown = false;
var fullreport = false;
AllEmployeeTable();
function currentTimestamp() {
    let date = new Date();
    const daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    document.getElementById("displayDateTime").innerText = daylist[date.getDay()]
        + " " + monthNames[date.getMonth()] + " " + date.getDate() + " "
        + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
}
function GetNumberofRequests() {
    iconvalue = document.getElementsByTagName("i")[0];
    let Req = JSON.parse(localStorage.getItem('Requests')) || [];
    iconvalue.setAttribute('value', `${Req.length}`);
}
function BuildTableofRequests() {
    if (!isTableshown) {
        let table = document.getElementById("ReqTable");
        document.getElementsByClassName("RegisterReq")[0].style.display = "flex";
        document.getElementsByClassName("AllEmp")[0].style.display = "none";
        document.getElementsByClassName("FullReport")[0].style.display = "none";
        document.getElementsByClassName("LateReport")[0].style.display = "none";
        document.getElementsByClassName("ExcuseReport")[0].style.display = "none";
        document.getElementsByClassName("EmpBrief")[0].style.display = "none";
        let Employees = JSON.parse(localStorage.getItem('Requests')) || [];
        Employees.forEach(element => {
            let row = table.insertRow(-1);
            let c1 = row.insertCell(0);
            let c2 = row.insertCell(1);
            let c3 = row.insertCell(2);
            let c4 = row.insertCell(3);
            let flelement = document.createElement("h2");
            flelement.innerText = "Full Name: ";
            flelement.innerText += element['firstname'] + " " + element["lastname"];
            emailelment = document.createElement("h4");
            emailelment.innerText = "E-mail: ";
            emailelment.innerText += element['email'];
            addresselment = document.createElement("h4");
            addresselment.innerText = "Address: ";
            addresselment.innerText += element['address'] ? element['address'] : "Not Spaceified";
            ageelemnt = document.createElement("h4");
            ageelemnt.innerText = "Age: ";
            ageelemnt.innerText += element['age'] ? element['age'] : "Not Spaceified";
            c1.appendChild(flelement);
            c1.appendChild(emailelment);
            c1.appendChild(addresselment);
            c1.appendChild(ageelemnt);
            c2.innerHTML = `<input type=button value=Security man onclick="Approve(this)">`;
            c3.innerHTML = `<input type=button value=Employee  onclick="Approve(this)">`;

            c4.innerHTML = `<input type=button value=Reject onclick="Reject(this)">`;
        });
        isTableshown = true;
        icon = document.getElementsByTagName("i")[0];
        icon.disabled = true;
    }
}
var tmp;
//utility function
function deleteRow(btn) {
    let row = btn.parentNode.parentNode;
    let idx = row.rowIndex;
    row.parentNode.removeChild(row);
    tmp = btn.value;
    return idx;
}
//utility Generate Random username
function randomUsrname() {
    let length = 6;
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result
}
//generate random password
function randomPassword() {
    let randomstring = Math.random().toString(36).slice(-8);
    return randomstring;
}
function sendMail(email, subject, message) {
    Email.send({
        SecureToken: "ce0acead-626b-49f7-87ba-d056f55d9465",
        To: email,
        From: "salma.ahmed.2009@hotmail.com",
        Subject: subject,
        Body: message
    }).then(
        message => console.log(message)
    );
}
function Approve(btn) {
    //from request to user
    let idx = deleteRow(btn) - 1;
    Req = [];
    Req = JSON.parse(localStorage.getItem('Requests')) || [];
    approvdEmp = idx == 0 ? Req.shift() : Req.splice(idx, idx);

    localStorage.setItem('Requests', JSON.stringify(Req));
    //generate random username 
    users = [];
    users = JSON.parse(localStorage.getItem('Users')) || [];
    duplicated = true
    while (duplicated) {
        var duplicated = false
        var uname = randomUsrname();
        console.log(uname)
        users.forEach((element) => {
            if (element['username'] === uname) {
                duplicated = true;
                return;
            }
        });
    }
    pass = randomPassword();
    approvdEmp.username = uname;
    approvdEmp.password = pass;
    approvdEmp.Role = tmp;
    approvdEmp.attendance = [];
    users.push(approvdEmp);
    sendMail(approvdEmp['email'], 'Congrats you have been accepted',
        `<b>your username:</b>${uname}<br>
    <b>your password:</b>${pass}\n<br>
    Best Wishes \n<br>
    Salma,Shrouk,Maha`)
    localStorage.setItem('Users', JSON.stringify(users));
}
function Reject(btn) {
    let idx = deleteRow(btn) - 1;
    Req = [];
    Req = JSON.parse(localStorage.getItem('Requests')) || [];
    RejectedEmp = idx == 0 ? Req.shift() : Req.splice(idx, idx, 1);
    localStorage.setItem('Requests', JSON.stringify(Req));
    sendMail(RejectedEmp['email'], 'Sorry you\'rn\'t accepted',
        `Sorry you\'rn\'t accepted
    Best Wishes \n<br>
    Salma,Shrouk,Maha`)
}
function AllEmployeeTable() {
    let table = document.getElementById("FullEmptble");
    document.getElementsByClassName("RegisterReq")[0].style.display = "none";
    document.getElementsByClassName("AllEmp")[0].style.display = "block";
    document.getElementsByClassName("FullReport")[0].style.display = "none";
    document.getElementsByClassName("LateReport")[0].style.display = "none";
    document.getElementsByClassName("ExcuseReport")[0].style.display = "none";
    document.getElementsByClassName("EmpBrief")[0].style.display = "none";
    document.getElementsByTagName("i")[0].disabled = false;
    isTableshown = false;
    lateReportshown = false;
    fullreport = false
    users = JSON.parse(localStorage.getItem('Users')) || [];
    if (AllEmpshown) {
        users.forEach((item) => {
            if (item.Role !== "Admin") {
                let row = table.insertRow(-1);
                let c1 = row.insertCell(0);
                let c2 = row.insertCell(1);
                if (item.Role !== "Admin") {
                    if (item.attendance.length > 0) {
                        day = new Date(item.attendance[item.attendance.length - 1].arrival).getDate();
                        month = new Date(item.attendance[item.attendance.length - 1].arrival).getMonth();
                        let flelement = document.createElement("h2");
                        flelement.innerText = "Full Name: ";
                        flelement.innerText += item.firstname + " " + item.lastname;
                        let usernameelment = document.createElement("h4");
                        usernameelment.innerText = "username: ";
                        usernameelment.innerText += item.username;
                        c1.appendChild(flelement)
                        c1.appendChild(usernameelment)
                        if (day == new Date().getDate() && month == new Date().getMonth()) {
                            if (item.attendance[item.attendance.length - 1].departure === '') {
                                c2.innerHTML = `<h2 id="present">Present</h2>`;
                            } else {
                                c2.innerHTML = `<h2 id="left">left</h2>`;
                            }

                        } else {
                            c2.innerHTML = `<h2 id="absent">Absent</h2>`;
                        }
                    }
                }
            }
        })
        AllEmpshown = false;
    }
}
function LateEmp() {
    //number of lates this month
    document.getElementsByClassName("RegisterReq")[0].style.display = "none";
    document.getElementsByClassName("AllEmp")[0].style.display = "none";
    document.getElementsByClassName("FullReport")[0].style.display = "none";
    document.getElementsByClassName("LateReport")[0].style.display = "flex";
    document.getElementsByClassName("ExcuseReport")[0].style.display = "none";
    document.getElementsByClassName("EmpBrief")[0].style.display = "none";
    document.getElementsByTagName("i")[0].disabled = false;
    isTableshown = false;
    AllEmpshown = false;
    users = JSON.parse(localStorage.getItem('Users')) || [];
    latearray = [];
    globalnumberoflates = 0;
    if (!lateReportshown) {
        document.getElementById("numberoflate").innerText = "Number of late this month:"
        document.getElementById("mostlatestemp").innerText = "The Most Employee has lates: "
        users.forEach((user) => {
            if (user.Role !== "Admin") {
                usAttend = user.attendance;
                Numberoflatesperuser = 0;
                usAttend.forEach((obj) => {
                    if (new Date(obj.arrival).getMonth() == new Date().getMonth()) {
                        currentdate = new Date(new Date().getFullYear(),
                            new Date().getMonth(), new Date(obj.arrival).getDate(), 8, 30);
                        arrival = new Date(obj.arrival).setSeconds(0, 0);
                        let diff = msToTime(Math.abs(currentdate - arrival));
                        let diffh = diff.split(":")[0];
                        let diffm = diff.split(":")[1];
                        if (diffh === "00") {
                            //he can have minimum 10 minutes late
                            if (Number(diffm) > 10) {
                                Numberoflatesperuser += 1;
                                globalnumberoflates += 1;
                            }

                        } else {
                            Numberoflatesperuser += 1;
                            globalnumberoflates += 1;
                        }
                    }
                })
                // console.log(Numberoflatesperuser);
                latearray.push(Numberoflatesperuser);
            }
        })
        //late today precentage
        absent = 0;
        Numberoflates = 0;
        users.forEach((user) => {
            if (user.Role !== "Admin") {
                usAttend = user.attendance;
                if (user.attendance.length > 0) {
                    existarr = new Date(user.attendance[user.attendance.length - 1].arrival).setSeconds(0, 0);
                    currentdate = new Date(new Date().getFullYear(),
                        new Date().getMonth(), new Date().getDate(), 8, 30);
                    day = new Date(user.attendance[user.attendance.length - 1].arrival).getDate();
                    month = new Date(user.attendance[user.attendance.length - 1].arrival).getMonth();
                    if (day == new Date().getDate() && month == new Date().getMonth()) {
                        let diff = msToTime(Math.abs(currentdate - existarr));
                        let diffh = diff.split(":")[0];
                        let diffm = diff.split(":")[1];
                        if (diffh === "00") {
                            if (Number(diffm) > 10) {
                                Numberoflates += 1;
                            }
                        } else {
                            Numberoflates += 1
                        }
                    } else {
                        absent += 1;
                    }
                }
            }

        })

        let percentage = (Numberoflates / Math.abs(users.length - absent - 1)) * 100
        var xValues = ["Late", "In Time"];
        var yValues = [percentage, percentage - 100];
        var barColors = ["#b91d47", "#00aba9"];
        new Chart("lateChart", {
            type: "pie",
            animation: true,
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Precentage of late today" + new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()
                }
            }

        });
        document.getElementById("numberoflate").innerText += " " + globalnumberoflates;
        let result = latearray.indexOf(Math.max(...latearray)) + 1;
        document.getElementById("mostlatestemp").innerText += " " + users[result].firstname + " " + users[result].lastname + " " + Math.max(...latearray) + " lates";
        lateReportshown = true;
    }
}
//uility function 
function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
//full Report
function FullReport() {
    document.getElementsByClassName("RegisterReq")[0].style.display = "none";
    document.getElementsByClassName("AllEmp")[0].style.display = "none";
    document.getElementsByClassName("FullReport")[0].style.display = "flex";
    document.getElementsByClassName("LateReport")[0].style.display = "none";
    document.getElementsByClassName("ExcuseReport")[0].style.display = "none";
    document.getElementsByClassName("EmpBrief")[0].style.display = "none";
    document.getElementsByTagName("i")[0].disabled = false;
    isTableshown = false;
    AllEmpshown = false;
    lateReportshown = false;
    var Numberoflates = 0;
    let numberofAbsent = 0;
    if (!fullreport) {
        users = JSON.parse(localStorage.getItem('Users')) || [];
        users.forEach((item) => {
            if (item.Role != "Admin") {
                if (item.attendance.length > 0) {
                    console.log(item.Role)
                    day = new Date(item.attendance[item.attendance.length - 1].arrival).getDate();
                    month = new Date(item.attendance[item.attendance.length - 1].arrival).getMonth();
                    if (day == new Date().getDate() && month == new Date().getMonth()) {
                        //check for late 
                        existarr = new Date(item.attendance[item.attendance.length - 1].arrival).setSeconds(0, 0);
                        currentdate = new Date(new Date().getFullYear(),
                            new Date().getMonth(), new Date().getDate(), 8, 30);
                        let diff = msToTime(Math.abs(currentdate - existarr));
                        let diffh = diff.split(":")[0];
                        let diffm = diff.split(":")[1];
                        if (diffh === "00") {
                            console.log("in")
                            if (Number(diffm) > 10) {
                                Numberoflates += 1;
                            }
                        } else {
                            console.log("in2")

                            Numberoflates += 1;
                        }
                    } else {
                        numberofAbsent += 1;
                    }
                }
            }
        });
        var xValues = ["Absent", "late", "Intime"];
        var yValues = [numberofAbsent, Numberoflates, (users.length - 1 - numberofAbsent - Numberoflates)];
        var barColors = ["red", "green", "blue"];
        new Chart("myChart", {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            animation: true,
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: "Attendance today" + new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()
                },
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                }
            }
        });
        BuildTableoflates();
        fullreport = true;
    }

}
//utility function
function BuildTableoflates() {
    let table = document.getElementById("details");
    users = JSON.parse(localStorage.getItem('Users')) || [];

    users.forEach((item) => {

        if (item.Role !== "Admin") {
            let row = table.insertRow(-1);
            let c1 = row.insertCell(0);
            let c2 = row.insertCell(1);
            let c3 = row.insertCell(2);
            let c4 = row.insertCell(3);
            if (item.Role !== "Admin") {
                usAttend = item.attendance;
                if (item.attendance.length > 0) {
                    Numberoflatesperuser = 0;
                    numberofexcuese = 0;
                    usAttend.forEach((obj) => {
                        if (new Date(obj.arrival).getMonth() == new Date().getMonth()) {
                            currentdate = new Date(new Date().getFullYear(),
                                new Date().getMonth(), new Date(obj.arrival).getDate(), 8, 30);
                            arrival = new Date(obj.arrival).setSeconds(0, 0);
                            let diff = msToTime(Math.abs(currentdate - arrival));
                            let diffh = diff.split(":")[0];
                            let diffm = diff.split(":")[1];
                            if (diffh === "00") {
                                //he can have minimum 10 minutes late
                                if (Number(diffm) > 10) {
                                    Numberoflatesperuser += 1;
                                }
                            } else {
                                Numberoflatesperuser += 1;
                            }
                            departure = new Date(obj.departure).setSeconds(0, 0);
                            diff = msToTime(Math.abs(departure - arrival));
                            if (Number(diffh) < 8) {
                                numberofexcuese += 1;
                            }
                        }
                    })
                    day = new Date(item.attendance[item.attendance.length - 1].arrival).getDate();
                    month = new Date(item.attendance[item.attendance.length - 1].arrival).getMonth();
                    let flelement = document.createElement("h2");
                    flelement.innerText = "Full Name: ";
                    flelement.innerText += item.firstname + " " + item.lastname;
                    c1.appendChild(flelement)
                    if (day == new Date().getDate() && month == new Date().getMonth()) {
                        if (item.attendance[item.attendance.length - 1].departure === '') {
                            c2.innerHTML = `<h2 id="present">Present</h2>`;
                        } else {
                            c2.innerHTML = `<h2 id="left">left</h2>`;
                        }

                    } else {
                        c2.innerHTML = `<h2 id="absent">Absent</h2>`;
                    }
                    c3.innerHTML = `<h2 >${Numberoflatesperuser}</h2>`
                    c4.innerHTML = `<h2 >${numberofexcuese}</h2>`

                }
            }
        }
    })
}
