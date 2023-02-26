function login(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if(!userIfEmpty(username) && !passIfEmpty(password)) {
        if(userExist(username,password)){
            checkRole();
        }
    }

}
function userIfEmpty(username){
    if (username === "") {
        document.getElementById("errorf").innerText = "Username cann't be empty";
        document.getElementById("errorf").style.display = "block";
        document.getElementById("errorf").style.color = "red";
       return true;
    }
    else{
        return false;
    }
}
function userIfEmpty(username){
    if (username === "") {
        document.getElementById("usernameError").innerText = "Username cann't be empty";
        document.getElementById("usernameError").style.display = "block";
        document.getElementById("usernameError").style.color = "red";
       return true;
    }
    else{
        return false;
    }
}
function passIfEmpty(password){
    if (password === "") {
        document.getElementById("passError").innerText = "Password cann't be empty";
        document.getElementById("passError").style.display = "block";
        document.getElementById("passError").style.color = "red";
       return true;
    }
    else{
        return false;
    }
}
function userExist(username,password){
    var user = false;
    users = JSON.parse(localStorage.getItem('Users')) || [];
        users.forEach(element => {
             if (element['username'] === username && element['password'] === password) {
                role = element['Role'];
                user = true;
            }
            
        });
    if(!user){
        document.getElementById("usernameError").innerText = "wrong credentials invalid username or password";
        document.getElementById("usernameError").style.display = "block";
        document.getElementById("usernameError").style.fontSize = "1em";
        document.getElementById("usernameError").style.color = "red";
    }
    return user;   
}
function checkRole(){
    if(role==="Employee"){
        window.location.replace("EmployeePage.html");
    }
    else if(role==="Admin"){
        window.location.replace("AdminPage.html");
    }
    else if(role==="Security"){
        window.location.replace("AttendancePage.html");
    }
}