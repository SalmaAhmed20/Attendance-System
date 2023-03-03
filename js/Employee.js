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
var isDailyReportshown = false;
function BuildDailyReport(){
    console.log(isDailyReportshown);
    if (!isDailyReportshown) {
        let bodySec = document.getElementsByClassName("bodySec")[0];
        bodySec.innerHTML=null;
        dataForm = document.createElement("form");
        dataForm.setAttribute("class","dataForm");
        bodySec.appendChild(dataForm);
        dataForm.innerHTML = `
                            <label>Employee Name:</label>
                            <input type="text" id="Ename" value="">
                            <br><br>
                            <label  >Day:</label>
                            <input type="date" id="dayDate" value="">
                            <br><br>
                            <label>Arrival:</label>
                            <input type="text" id="arrivalDate" value="">
                            <br><br>
                            <label>Departure:</label>
                            <input type="text" id="departureDate" value="">
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
            if (new Date(arrival).toString().substr(0, 16)=== new Date(currentDate).toString().substr(0, 16)) {
                document.getElementById("arrivalDate").value = arrival.toString().substr(15, 6);
                document.getElementById("departureDate").value = departure.toString().substr(15, 6);
            }

        });
        // Handle date changes
        currentDateElement = document.getElementById('dayDate');
        currentDateElement.addEventListener('input', function () {
        currentDate =currentDateElement.valueAsDate;
        matched = false;
        var obj = attendance;
            
            obj.forEach(element => {
                var arrival = new Date(element.arrival);
                var departure = new Date(element.departure);
                if(new Date(arrival).toString().substr(0, 16)=== new Date(currentDate).toString().substr(0, 16)){
                    document.getElementById("arrivalDate").value = arrival.toString().substr(15, 6);
                    document.getElementById("departureDate").value = departure.toString().substr(15, 6);
                    matched=true;
                   
                }
                else{
                    if(!matched){
                        document.getElementById("arrivalDate").value = "none";
                        document.getElementById("departureDate").value = "none";
                    }
                    
                }

            });
        });
        console.log(document.getElementById("dayDate").value);
        isDailyReportshown=true;
        isMonthlyReportshown=false;
    }
}

//monthly report function
var isMonthlyReportshown = false;
function BuildMonthlyReport(){
    if (!isMonthlyReportshown) {
        let bodySec = document.getElementsByClassName("bodySec")[0];
        bodySec.innerHTML=null;
        dataForm = document.createElement("form");
        dataForm.setAttribute("class","dataForm");
        bodySec.appendChild(dataForm);
        dataForm.innerHTML = `
                            <label>Employee Name:</label>
                            <input type="text" id="Ename" value="">
                            <br><br>
                            <label  >Month:</label>
                            <input type="month" value="" id="monthDate">
                            <br><br>
                            `;
        table = document.createElement("table");
        dataForm.appendChild(table);
        
        //table headers
        row = table.insertRow(-1);
        monthHeader = document.createElement("th");
        arrivalHeader = document.createElement("th");
        departureHeader = document.createElement("th");
        monthHeader.innerText = "Month";
        arrivalHeader.innerText = "Arriavl";
        departureHeader.innerText = "Departure";
        table.appendChild(monthHeader);
        table.appendChild(arrivalHeader);
        table.appendChild(departureHeader);
        
        
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
        document.getElementById("monthDate").valueAsDate = new Date();

        var obj = attendance;
        obj.forEach(element => {
            var arrival = new Date(element.arrival);
            var departure = new Date(element.departure);
            if (arrival.getMonth() === currentDate.getMonth() && arrival.getYear() === currentDate.getYear()) {
                
                //table body
                row = document.createElement("tr");
                c1 = document.createElement("td");
                c2 = document.createElement("td");
                c3 = document.createElement("td");
                row.appendChild(c1);
                row.appendChild(c2);
                row.appendChild(c3);
                dayDate = document.createElement("h4");
                dayDate.innerText = arrival.toString().substr(0, 10);
                c1.appendChild(dayDate);
                arriavlHour = document.createElement("h4");
                arriavlHour.innerText = arrival.toString().substr(15, 6);
                c2.appendChild(arriavlHour);
                departureHour = document.createElement("h4");
                departureHour.innerText = departure.toString().substr(15, 6);
                c3.appendChild(departureHour);
                table.appendChild(row);

                
            }

        });
        // Handle month changes
        currentDateElement = document.getElementById('monthDate');
        currentDateElement.addEventListener('input', function () {
            
            
            table.innerHTML=null;
            //table headers
            row = table.insertRow(-1);
            monthHeader = document.createElement("th");
            arrivalHeader = document.createElement("th");
            departureHeader = document.createElement("th");
            monthHeader.innerText = "Month";
            arrivalHeader.innerText = "Arriavl";
            departureHeader.innerText = "Departure";
            table.appendChild(monthHeader);
            table.appendChild(arrivalHeader);
            table.appendChild(departureHeader);
            
            
            
            currentDate =currentDateElement.valueAsDate;
            console.log(currentDate);
            matched = false;
            var obj = attendance;
            obj.forEach(element => {
                var arrival = new Date(element.arrival);
                var departure = new Date(element.departure);
                if (arrival.getMonth() === currentDate.getMonth() && arrival.getYear() === currentDate.getYear()) {
                    //table body
                    row = document.createElement("tr");
                    c1 = document.createElement("td");
                    c2 = document.createElement("td");
                    c3 = document.createElement("td");
                    row.appendChild(c1);
                    row.appendChild(c2);
                    row.appendChild(c3);
                    dayDate = document.createElement("h4");
                    dayDate.innerText = arrival.toString().substr(0, 10);
                    c1.appendChild(dayDate);
                    arriavlHour = document.createElement("h4");
                    arriavlHour.innerText = arrival.toString().substr(15, 6);
                    c2.appendChild(arriavlHour);
                    departureHour = document.createElement("h4");
                    departureHour.innerText = departure.toString().substr(15, 6);
                    c3.appendChild(departureHour);
                    table.appendChild(row);
                    matched=true;

                
            }    
                
            else{
                if(!matched){
                    table.innerHTML=null;
                    //table headers
                    row = table.insertRow(-1);
                    monthHeader = document.createElement("th");
                    arrivalHeader = document.createElement("th");
                    departureHeader = document.createElement("th");
                    monthHeader.innerText = "Month";
                    arrivalHeader.innerText = "Arriavl";
                    departureHeader.innerText = "Departure";
                    table.appendChild(monthHeader);
                    table.appendChild(arrivalHeader);
                    table.appendChild(departureHeader);
                }
                
                
            }

        });
        });
        console.log(document.getElementById("monthDate").value);
        isMonthlyReportshown=true;
        isDailyReportshown=false;
    }
}
