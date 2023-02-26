
currentTimestamp();
GetNumberofRequests();
setInterval(currentTimestamp, 60000);
setInterval(GetNumberofRequests, 20000);
// sendMail("saloma", "salma.ahmed.anees@gmail.com", 'Test Subject', 'Test Message')

var isTableshown = false;
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
        let table = document.getElementsByTagName("table")[0];
        let Employees = JSON.parse(localStorage.getItem('Requests')) || [];
        Employees.forEach(element => {
            let row = table.insertRow(-1);
            let c1 = row.insertCell(0);
            let c2 = row.insertCell(1);
            let c3 = row.insertCell(2);
            let c4 = row.insertCell(3);
            flelement = document.createElement("h2");
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
