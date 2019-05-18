const apiUrl = 'http://localhost:3000/api/users';
var blankArr = [];



const fetchAPI =(cb)=>{
    fetch('http://localhost:3000/api/users').then(res => res.json()).then(data => {
        cb(data)
        // data.forEach(newdata => {
            
        // });
    })
} 

export default fetchAPI;






