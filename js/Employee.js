//we will get the currentUser from login page
currentUser="yMMZSo";
currentUserFName="";
currentUserLName="";
users = [];
users = JSON.parse(localStorage.getItem('Users')) || [];
users.forEach(element => {
    if (element['username'] === currentUser) {
        currentUserFName=element['firstname']; 
        currentUserLName=element['lastname']; 
        return;
    }
});
let h2 = document.getElementsByTagName("h2")[0];
h2.innerText = "Hello" + " " + currentUserFName + " " + currentUserLName;
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