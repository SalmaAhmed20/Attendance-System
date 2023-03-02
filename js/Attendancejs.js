function confirmAttendance(){
    currentDate = new Date();
    //alert(currentDate);
    username = document.getElementById("username").value;
    if(userExist(username)){
        attObj={
            'arrival': currentDate+'',
            'departure': ''
        }
        alert(attObj.arrival);
        if(userobj.attendance.length == 0){
           
            users.forEach(element => {
                if (element['username'] === username) {
                   element.attendance.push(attObj)
                  
               }
               
           });
        }
       
        else{
            var lastAtten = userobj.attendance[userobj.attendance.length-1];
            var arrival = new Date(lastAtten.arrival);
            if(lastAtten.departure ===''){
                
                if(arrival.getDate()+arrival.getMonth()+arrival.getYear()=== currentDate.getDate()+currentDate.getMonth()+currentDate.getYear()){
                    lastAtten.departure = currentDate+'';                }
                else{
                    Date.prototype.addHours = function(h) {
                        this.setTime(this.getTime() + (h*60*60*1000));
                        return this;
                    }
                    lastAtten.departure = arrival.addHours(8);
                    userobj.attendance.push(attObj);
                    
                }
                
               
            }
            else{
                if(arrival.getDate()+arrival.getMonth()+arrival.getYear()=== currentDate.getDate()+currentDate.getMonth()+currentDate.getYear()){
                    
                    return;
                }
                else{
                    userobj.attendance.push(attObj);
                }
                
               
            }
            
        }
        
       localStorage.setItem('Users', JSON.stringify(users));
       console.log(userobj.attendance);
       
        
       
    }
}
function userExist(username){
    var user = false;
    userobj={};
    users = JSON.parse(localStorage.getItem('Users')) || [];
        users.forEach(element => {
             if (element['username'] === username) {
                userobj = element;
                user = true;
            }
            
        });
    if(!user){
        document.getElementById("usernameError").innerText = "username does not exist.";
        document.getElementById("usernameError").style.display = "block";
        document.getElementById("usernameError").style.fontSize = "1em";
        document.getElementById("usernameError").style.color = "red";
    }
    return user;   
}
