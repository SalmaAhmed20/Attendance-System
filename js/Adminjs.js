document.addEventListener("DOMContentLoaded", function () {
    GetNumberofRequests();
    setInterval(currentTimestamp, 60000);
    setInterval(GetNumberofRequests, 20000);


});
function currentTimestamp() {
    // console.log(new Date());
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
    let Employees = JSON.parse(localStorage.getItem('Requests')) || [];
    iconvalue.setAttribute('value',`${Employees.length}`);
}
function BuildTableofRequests()
{
    let table = document.getElementsByTagName("table")[0];
    let Employees = JSON.parse(localStorage.getItem('Requests')) || [];
    Employees.forEach(element => {
        let row = table.insertRow(-1);
        let c1 = row.insertCell(0);
        let c2 = row.insertCell(1);
        let c3 = row.insertCell(2);

        c1.innerText = JSON.stringify (element);
        c2.innerHTML = `<input type=button value=Approve>`;
        c3.innerHTML = `<input type=button value=Reject>`;
    });
}