function excuses(){
    currentDate = new Date();
    users = JSON.parse(localStorage.getItem('Users')) || [];
    //get current month excuses
    for(var x=1;x<users.length;x++){
        for(var j=0;j<users[x]["attendance"].length;j++){
            users[x]["attendance"] = users[x]["attendance"].filter(function(att){
                arrivalTime = new Date(att.arrival);
                departureTime = new Date(att.departure);
                if(arrivalTime.getMonth()===currentDate.getMonth()){
                    if(departureTime.getHours() - arrivalTime.getHours() >=8){
                        return false;
                    }
                    else{
                        return true;
                    }
                }else{
                    return false;
                }
            })
        }
        users[x]["noOfExcuses"]=users[x]["attendance"].length;
    }
    displayExcusesTable();
}
function displayExcusesTable(){
    document.getElementsByClassName("RegisterReq")[0].style.display = "none";
    document.getElementsByClassName("AllEmp")[0].style.display = "none";
    document.getElementsByClassName("FullReport")[0].style.display = "none";
    document.getElementsByClassName("LateReport")[0].style.display = "none";
    document.getElementsByClassName("ExcuseReport")[0].style.display = "flex";
    document.getElementsByClassName("EmpBrief")[0].style.display = "none";
    if(excusesTable.children.length < 2){
        for(var x=0; x<users.length;x++){
            if(users[x].attendance.length>0){
                var row = document.createElement("tr");
                var td1 = document.createElement("td");
                td1.innerText = users[x]["firstname"]+" "+users[x]["lastname"];
                var td2 = document.createElement("td");
                td2.innerText = users[x]["noOfExcuses"];
                var td3 = document.createElement("td");
                td3.innerHTML="<p>";
                for(var j=0; j<users[x]["attendance"].length; j++){
                    td3.innerHTML+=`Arrival: ${users[x]["attendance"][j].arrival}<br> 
                    Departure: ${users[x]["attendance"][j].departure}<br><br>`
                }
                td3.innerHTML+="</p>";
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                excusesTable.appendChild(row);
            }
        }
    }
}