const main = document.getElementById('descriptionMain');
let data = [];
// const loadData = async () => {
//     const result = await fetch('../json/data.json')
//     data = await result.json();
//     redirect(data);
// };
data = JSON.parse(localStorage.getItem("data"));

function redirect(data) {
    let a = localStorage.getItem("Position").toLowerCase();
    let b = localStorage.getItem("Company").toLowerCase();
    const searchedData = data.filter((jobs) => {
        return (
            jobs.companyName.toLowerCase().includes(b) &&
            jobs.Position.toLowerCase().includes(a)
        );
    });
    printDescription(searchedData);
}
redirect(data);
function printDescription(datax) {
    // console.log(datax);
    let str = `
    <section class="container description__details">
        <div class="description__header">
            <img src=${datax[0].image} alt="logo-scn">
            <p>Immediate Recruitment For <Span>${datax[0].Position}</Span></p>
            <ul class="description__details">
                <li><i class="fa fa-map-marker" aria-hidden="true"></i>${datax[0].Location}</li>
                <li><i class="fa fa-briefcase" aria-hidden="true"></i>${datax[0].experienceLevel}</li>
                <li><i class="fa fa-money" aria-hidden="true"></i>${datax[0].Salary} LPA</li>
            </ul>
        </div>    
    </section>
    <section class="container description__details--about">
        <h2>About The Company</h2>
        <p>${datax[0].aboutCompany}</p>
        <a href="#" class="">Apply Now</a>
    </section>
    <section class="container description__details--jd">
        <h3>Job Description</h3>
        <p>${datax[0].fullDescription}</p>
        <h4>Desired skills and Experience</h4>
        <p>`
    for (let i = 0; i < datax[0].skills.length; i++) {
        str += '"' + datax[0].skills[i] + '", ';
    }
    str += `</p>
    </section>
    <section class="container description__details--ent">
        <P>Experience Level : <span>${datax[0].hiringLevel}</span></P>
        <p>Employment Type : <span>${datax[0].employmentType}</span></p>
        <a href=${datax[0].companyWebsite}>Visit Company Website</a>
    </section>
    `;
    if(main) main.innerHTML = str;
}
// loadData();