function usernameForm() {
    document.getElementsByClassName("RegisterReq")[0].style.display = "none";
    document.getElementsByClassName("AllEmp")[0].style.display = "none";
    document.getElementsByClassName("FullReport")[0].style.display = "none";
    document.getElementsByClassName("LateReport")[0].style.display = "none";
    document.getElementsByClassName("ExcuseReport")[0].style.display = "none";
    document.getElementsByClassName("EmpBrief")[0].style.display = "flex";
}
function employeeBrief() {
    username = document.getElementById("username").value;
    if (userExist()) {
        getUserExcuses();
        getUserLateAtten();
        getNormalAtten();
        table();
    }

}
function userExist() {

    var exist = false;
    user = {};
    users = JSON.parse(localStorage.getItem('Users')) || [];
    users.forEach(element => {
        if (element['username'] === username) {
            user = element;
            exist = true;
        }

    });
    if (!exist) {
        document.getElementById("usernameError").innerText = "username does not exist.";
        document.getElementById("usernameError").style.display = "block";
        document.getElementById("usernameError").style.fontSize = "1em";
        document.getElementById("usernameError").style.color = "red";
    }
    return exist;
}
function getUserExcuses() {

    currentDate = new Date();


    userExcuses = user["attendance"].filter(function (att) {
        arrivalTime = new Date(att.arrival);
        departureTime = new Date(att.departure);
        if (arrivalTime.getMonth() === currentDate.getMonth()) {
            if (departureTime.getHours() - arrivalTime.getHours() >= 8) {
                return false;
            }
            else {
                return true;
            }
        } else {
            return false;
        }
    });
    //console.log(userExcuses);
   
}
function getUserLateAtten(){
    userLateAtten = user["attendance"].filter(function (att) {
        arrivalTime = new Date(att.arrival);
        if (arrivalTime.getMonth() === currentDate.getMonth()) {
            if (arrivalTime.getHours()+''+arrivalTime.getMinutes() > 840) {
                
                    return true;
            
            }else{
                return false;
            }
        }
    });
    //console.log(userLateAtten);
}
function getNormalAtten(){
    normalWorkingHours = user["attendance"].filter(function(item) {
        return userLateAtten.indexOf(item) === -1;
    });
    normalWorkingHours = user["attendance"].filter(function(item) {
        return userExcuses.indexOf(item) === -1;
    });
    //console.log(normalWorkingHours);
}
function table(){
    regisdiv.style.display="none";
    if (briefTable.children.length ===0){
        
        if(userExcuses.length>0){
            var excusesRow = document.createElement("tr");
            var excusesTh = document.createElement("th");
            excusesTh.innerText="Excuses";
            var excusesTd = document.createElement("td");
            excusesTd.innerHTML="<p>";
            for(var x=0; x<userExcuses.length; x++){
                excusesTd.innerHTML+=`Arrival: ${userExcuses[x].arrival}<br> 
                Departure: ${userExcuses[x].departure}<br><br>`
            }
            excusesTd.innerHTML+="</p>";
            excusesRow.appendChild(excusesTh);
            excusesRow.appendChild(excusesTd);
            briefTable.appendChild(excusesRow);

        }
        if(userLateAtten.length>0){
            var lateRow = document.createElement("tr");
            var lateTh = document.createElement("th");
            lateTh.innerText="Late";
            var lateTd = document.createElement("td");
            lateTd.innerHTML="<p>";
            for(var x=0; x<userLateAtten.length; x++){
                lateTd.innerHTML+=`Arrival: ${userLateAtten[x].arrival}<br> 
                Departure: ${userLateAtten[x].departure}<br><br>`
            }
            lateTd.innerHTML+="</p>";
            lateRow.appendChild(lateTh);
            lateRow.appendChild(lateTd);
            briefTable.appendChild(lateRow);

        }
        if(normalWorkingHours.length>0){
            var normalWorkingHoursRow = document.createElement("tr");
            var normalWorkingHoursTh = document.createElement("th");
            normalWorkingHoursTh.innerText="Normal Working Hours";
            var normalWorkingHoursTd = document.createElement("td");
            normalWorkingHoursTd.innerHTML="<p>";
            for(var x=0; x<normalWorkingHours.length; x++){
                normalWorkingHoursTd.innerHTML+=`Arrival: ${normalWorkingHours[x].arrival}<br> 
                Departure: ${normalWorkingHours[x].departure}<br><br>`
            }
            normalWorkingHoursTd.innerHTML+="</p>";
            normalWorkingHoursRow.appendChild(normalWorkingHoursTh);
            normalWorkingHoursRow.appendChild(normalWorkingHoursTd);
            briefTable.appendChild(normalWorkingHoursRow);

        }
        
    }
}