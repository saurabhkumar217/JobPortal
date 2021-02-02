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

let data = JSON.parse(localStorage.getItem("data"));
// console.log(data);
let a = localStorage.getItem("editpos");
let b = localStorage.getItem("editcnm");
function editSearch() {
    
    
    // let data = localStorage.getItem("data", JSON.stringify(data));
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i].companyName, data[i].Position);
        if(data[i].companyName === b && data[i].Position === a){
            CompanyName.value = data[i].companyName;
            aboutCompany.value = data[i].aboutCompany;
            Position.value = data[i].Position;
            experienceLevel.value = data[i].experienceLevel;
            employmentType.value = data[i].employmentType;
            Location.value = data[i].Location;
            lastDateToApply.value = data[i].lastDateToApply;
            hiringLevel.value = data[i].hiringLevel;
            Salary.value = data[i].Salary;
            image.value = data[i].image;
            JobDescription.value = data[i].JobDescription;
            fullDescription.value = data[i].fullDescription;
            skills.value = data[i].skills;
            companyWebsite.value = data[i].companyWebsite;
            break;
        }
        else{
            continue;
        }
        
    }
    
    
}
function getedit() {
    if (confirm("Do you really want to Edit Data")) {
        for (let i = 0; i < data.length; i++) {
            // console.log(data[i].companyName, data[i].Position);
            if(data[i].companyName === b && data[i].Position === a){
                data[i].companyName = CompanyName.value;
                data[i].aboutCompany = aboutCompany.value;
                data[i].Position = Position.value;
                data[i].experienceLevel = experienceLevel.value;
                data[i].employmentType = employmentType.value;
                data[i].Location = Location.value;
                data[i].lastDateToApply = lastDateToApply.value;
                data[i].hiringLevel = hiringLevel.value;
                data[i].Salary = Salary.value;
                data[i].image = image.value;
                data[i].JobDescription = JobDescription.value;
                data[i].fullDescription = fullDescription.value;
                data[i].skills = skills.value;
                data[i].companyWebsite = companyWebsite.value;
            
            }
        }
        localStorage.setItem("data", JSON.stringify(data));
        alert('Edited');
      } else {
        alert('cancelled');
      }
    
}
editSearch();
