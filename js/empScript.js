//-------------------Variables-------------------
let CompanyName = document.getElementById('companyName');
let aboutCompany = document.getElementById('aboutCompany');
let Position = document.getElementById('position');
let experienceLevel = document.getElementById('experienceLevel');
let employmentType = document.getElementById('employmentType');
let Location = document.getElementById('location');
let lastDateToApply = document.getElementById('lastDateToApply');
let hiringLevel = document.getElementById('hiringLevel');
let Salary = document.getElementById('salary');
let image = document.getElementById('imageloc');
let JobDescription = document.getElementById('JobDescription');
let fullDescription = document.getElementById('fullDescription');
let skills = document.getElementById('skills');
let companyWebsite = document.getElementById('companyWebsite');
// console.log(CompanyName);
//--------------Load Json data -------------------
data = JSON.parse(localStorage.getItem("data"));
//--------------- Display data to employee----------
const displayData = (outputlist) => {
    const htmlOutput = outputlist
        .map((output) => {
            return `
            <tr>
                <td>${output.companyName}</td>
                <td>${output.Position}</td>
                <td>${output.experienceLevel}</td>
                <td>${output.Location}</td>
                <td>${output.lastDateToApply}</td>
                <td>${output.hiringLevel}</td>
                <td>${output.Salary}</td>
                <td>${output.JobDescription}</td>
                <td><a href = "edit.html" onclick = "editJobs()">Edit</a>
                    <button onclick = "delJobs()">Delete</button>
                </td>
            </tr>
        `;
        })
        .join('');
        document.getElementById('showData').innerHTML = htmlOutput;
};
displayData(data);
function addJob() {
    let newJob = {
        "companyName": companyName.value,
        "aboutCompany": aboutCompany.value,
        "Position": Position.value,
        "experienceLevel": experienceLevel.value,
        "employmentType" : employmentType.value,
        "Location": Location.value,
        "lastDateToApply": lastDateToApply.value,
        "hiringLevel": hiringLevel.value,
        "Salary": Salary.value,
        "image": "../images/" + image.value + ".svg",
        "JobDescription": JobDescription.value,
        "fullDescription": fullDescription.value,
        "skills": skills.value.split(','),
        "date": ["2020-12-15T10:00:00Z", "2021-01-30T23:59:59Z"],
        "companyWebsite": companyWebsite.value
    };
    data.push(newJob);
    localStorage.setItem("data", JSON.stringify(data));
    alert('Added');
    location.href = 'employee.html';
}
function delJobs(e) {
    var x = getClick(e);
    // console.log(x);
    var y = x.parentNode.parentNode;
    
    let r =  y.children[1].innerText;
    let c = y.children[0].innerText;
    
    if (confirm("Do You Really want to delete")) {
        for( var i = 0; i < data.length; i++){ 
    
            if ( data[i].companyName === c && data[i].Position === r) { 
                data.splice(i, 1); 
            }
        }
        localStorage.setItem("data", JSON.stringify(data));
        alert('Deleted');
        location.href = 'employee.html'
      } else {
        alert("You pressed Cancel!");
      }
    
}
//to store html collection
function getClick(e) {
    e = e || window.event;
    return e.target || e.srcElement;
};
function editJobs(e) {
    var x = getClick(e);
    var y = x.parentNode.parentNode;
    
    let r =  y.children[1].innerText;//po
    let c = y.children[0].innerText;//com name
    
    localStorage.setItem("editpos", r);
    localStorage.setItem("editcnm", c);
}