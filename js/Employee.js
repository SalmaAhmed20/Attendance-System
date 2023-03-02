let h2 = document.getElementsByTagName("h2")[0];
h2.innerText = "Hello" + " " + sessionStorage.getItem("fullName");
console.log(sessionStorage.getItem("fullName"));
currentTimestamp();
//Time function
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
//daily report function
function BuildDailyReport(){
    let bodySec = document.getElementsByClassName("bodySec")[0];
    dataForm = document.createElement("form");
    dataForm.setAttribute("class","dataForm");
    bodySec.appendChild(dataForm);
    dataForm.innerHTML = `
                        <label>Employee Name:</label>
                        <input type="text" id="Ename" value="">
                        <br><br>
                        <label  >Day:</label>
                        <input type="date" value="" id="dayDate">
                        <br><br>
                        <label>Arrival:</label>
                        <input type="text" value="" id="arrivalDate">
                        <br><br>
                        <label>Departure:</label>
                        <input type="text" id="departureDate">
                        <br><br>
                        `;
    
    var userName = sessionStorage.getItem("currentUser");
    users = JSON.parse(localStorage.getItem('Users')) || [];
    users.forEach(element => {
        if (element['username'] === userName) {
            attendance=element['attendance'];
        }

    });

    document.getElementById("Ename").value = sessionStorage.getItem("fullName");
    document.getElementById("Ename").setAttribute("readonly","");
    currentDate = new Date();
    document.getElementById("dayDate").valueAsDate = new Date();
    
    var obj = attendance;
    obj.forEach(element => {
        var arrival = new Date(element.arrival);
        var departure = new Date(element.departure);
        if (arrival.getDate()+arrival.getMonth()+arrival.getYear()=== currentDate.getDate()+currentDate.getMonth()+currentDate.getYear()) {
            document.getElementById("arrivalDate").value = arrival.toString().substr(15, 6);
            document.getElementById("departureDate").value = departure.toString().substr(15, 6);
        }

    });
    // Handle date changes
    currentDateElement = document.getElementById('dayDate');
    currentDateElement.addEventListener('input', function () {
        currentDate =currentDateElement.valueAsDate;
        console.log(currentDate);
        var obj = attendance;
        obj.forEach(element => {
        var arrival = new Date(element.arrival);
        var departure = new Date(element.departure);
        if (arrival.getDate()+arrival.getMonth()+arrival.getYear()=== currentDate.getDate()+currentDate.getMonth()+currentDate.getYear()) {
            document.getElementById("arrivalDate").value = arrival.toString().substr(15, 6);
            document.getElementById("departureDate").value = departure.toString().substr(15, 6);
        }
        else{
            document.getElementById("arrivalDate").value = "";
            document.getElementById("departureDate").value = "";
        }

    });
    });
    
    
    console.log(document.getElementById("dayDate").value);
}
