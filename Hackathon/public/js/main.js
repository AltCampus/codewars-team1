const apiUrl = 'http://localhost:3000/api/users';
var blankArr = [];



// fetching user data
async function fetchUsers(){
    let response = await fetch(apiUrl);
    let data = response.json();
    blankArr.push(data);
    console.log(blankArr)
}



fetchUsers();

// var uname = data.codewars.username;
// console.log(uname);






