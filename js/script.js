// Variables Initialised 
const search = document.getElementById('search');
const locsearch = document.getElementById('locsearch');
const display = document.getElementById('list');
const searchbutt = document.getElementById('searchbutt');
let data = [];
let count = 0;
let resdis = document.getElementById('resdis');
let salrange = document.getElementById('salrange');
let salrangevalue = document.getElementById('salrangevalue');
let sortbtn = document.getElementById('sortbtn');
// Load arrow function to load json data => string 
const loadData = async () => {
    const result = await fetch('../json/data.json')
    data = await result.json();
    localStorage.setItem("data", JSON.stringify(data));
};
data = JSON.parse(localStorage.getItem("data"));
// Function call loaddata
if (data === null) {
    loadData();
}


// sticky header
window.onscroll = function() {fixHeader()};

// Get the header
let header = document.getElementById("page-header");

// Get the offset position of the navbar
let sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function fixHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
// side filter
function openNav() {
    document.getElementById('filter').style.width = "25rem";
    // document.getElementById('list').style.marginLeft = "25rem";
}
function closeNav() {
    document.getElementById('filter').style.width = "0";
    // document.getElementById('list').style.marginLeft = "0";
}
// Display arrow Function

const printjobs = (outputlist) => {
    const htmlOutput = outputlist
        .map((output) => {
            return `
            <div class="show">
                <img src=${output.image} alt="${output.companyName} logo">
                <div class="job-description">
                    <h2 class="fcs ccn"><span>${output.companyName}</span></h2>
                    <p><span class="fcs"><i class="fa fa-map-marker" aria-hidden="true"></i></span> ${output.Location}</p>
                    <p><span class="fcs">Position  :  </span><span>${output.Position}</span></p>
                    <p><span class="fcs">Salary  :  </span><i class="fa fa-inr" aria-hidden="true"></i>${output.Salary} LPA</p>
                    <p><span class="fcs">Job-Posted  :  </span><i>${convertDate(output.date[0])}</i></p>
                    <p><span class="fcs">Last-Date  :  </span><i>${convertDate(output.date[1])}</i></p>
                    <a href="jobDetails.html" class="apply" onclick="localData()">Apply Here</a>
                </div>
            </div>
        `;
        })
        .join('');
        display.innerHTML = htmlOutput;
};
printjobs(data);
// Logic of the search functionality
if(searchbutt){
    searchbutt.addEventListener('click', (e) => {
        resdis.classList.remove('hidden');
        resdis.classList.add('visible_flex');
        const inputStr = document.getElementById('search').value.toLowerCase();
        const inputStr1 = document.getElementById('locsearch').value.toLowerCase();
        if (inputStr1.length > 0 && inputStr.length > 0) {
            const searchedData = data.filter((jobs) => {
                return (
                    (jobs.companyName.toLowerCase().includes(inputStr) ||
                    jobs.Position.toLowerCase().includes(inputStr)) &&
                    jobs.Location.toLowerCase().includes(inputStr1)
                );
            });
            printjobs(searchedData);
            printfilterfield(searchedData);
            count = searchedData.length;
            if (count > 0) {
                document.getElementById('count').innerHTML = searchedData.length + 'records found ...';
            }else{
                document.getElementById('count').innerHTML = 'No record found ...';
            }
            
        }
        
        else if (inputStr1.length > 0) {
            const searchedData = data.filter((jobs) => {
                return (
                    jobs.Location.toLowerCase().includes(inputStr1)
                );
            });
            printjobs(searchedData);
            printfilterfield(searchedData);
            count = searchedData.length;
            if (count > 0) {
                document.getElementById('count').innerHTML = searchedData.length + 'records found ...';
            }else{
                document.getElementById('count').innerHTML = 'No record found ...';
            }
            
        }
        else if(inputStr.length > 0){
            const searchedData = data.filter((jobs) => {
                return (
                    jobs.companyName.toLowerCase().includes(inputStr) ||
                    jobs.Position.toLowerCase().includes(inputStr)
                );
            });
            printjobs(searchedData);
            printfilterfield(searchedData);
            count = searchedData.length;
            if (count > 0) {
                document.getElementById('count').innerHTML = searchedData.length + 'records found ...';
            }else{
                document.getElementById('count').innerHTML = 'No record found ...';
            }
        }
        else{
            resdis.classList.add('hidden');
        }
    });
}

// carousel js starts

// let slidePosition = 0;
// const slides = document.getElementsByClassName('carousel__item');
// const dots = document.getElementsByClassName('dot');
// // console.log(dots);
// const totalSlides = slides.length;
// if(document.getElementById('carousel__button--next')){
//     document.getElementById('carousel__button--next').addEventListener('click', function () {
//     moveToNextSlide();
// });}
// if(document.getElementById('carousel__button--prev')){
//     document.getElementById('carousel__button--prev').addEventListener('click', function () {
//         moveToPrevSlide();
//     });    
// }
// function updateSlidePosition() {
//     for(let slide of slides){
//         slide.classList.remove('carousel__item--visible');
//         slide.classList.add('carousel__item--hidden');
//     }    
//     slides[slidePosition].classList.add('carousel__item--visible');
// };
// function moveToNextSlide() {
//     dots[slidePosition].classList.remove('dot__active');
//     if (slidePosition === totalSlides - 1) {
//         slidePosition = 0;
//     }else{
//         slidePosition++;
//     }
//     dots[slidePosition].classList.add('dot__active');
//     updateSlidePosition();
//     setTimeout(moveToNextSlide, 5000);
// };
// moveToNextSlide();
// function moveToPrevSlide() {
//     dots[slidePosition].classList.remove('dot__active');
//     if (slidePosition === 0) {
//         slidePosition = totalSlides - 1;      
//     }else{
//         slidePosition--;
//     }
//     dots[slidePosition].classList.add('dot__active');
//     updateSlidePosition();
// };
// carousel js ends
sortbtn.addEventListener('click', () =>{
    if (sortbtn.value === 'Salary') {
        data = data.sort(sortByProperty("Salary"));
        printjobs(data);
    }
    if (sortbtn.value === 'Company') {
        data = data.sort(sortByProperty("companyName"));
        printjobs(data);
    }
    
});
function sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
   
       return 0;  
    }  
 }
// Microphone
function speak(str) {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
      var listen = new webkitSpeechRecognition();
      listen.lang = "en-US";
      listen.start();
      listen.onresult = function (e) {
          if (str === 'key') {
            searchkey.value = e.results[0][0].transcript;      
          }
          else if (str === 'position') {
            document.getElementById('search').value = e.results[0][0].transcript;
          }
          else if (str === 'loc') {
            document.getElementById('locsearch').value = e.results[0][0].transcript;
          }
        
        listen.stop();
      };
      listen.onerror = function(e) {
        listen.stop();
      }
    }
}
// filter data
let opstr ='';
let printfilterfield = (data) => {
    let cn = '';
     opstr = `<div>
            <p>Filter by Company</p>
            <div class="filter__item"  id="filter__comapny">
            `
            for (let i = 0; i < data.length; i++) {
                    cn+= '<label for="cn' + data[i].companyName +'">Cn</label>'
                    cn += '<input type="checkbox" class="filter__item--cb" id="cn' + data[i].companyName +'" name="filterCompanyName" value = "' + data[i].companyName +'"> <span class="ic" id="filterCompanyName">' + data[i].companyName + '</span></br>';
                }
                opstr += cn;
            opstr += `
            </div>
        </div>
        <div>
            <p>Filter by Salary</p>
            <div class="filter__item"  id="filter__salary">
    
            </div>
    </div>`
    document.getElementById('show-filter').innerHTML = opstr;
    salrange.oninput = () => {
        salrangevalue.innerHTML = salrange.value;
    }
}
// if(opstr.length > 0)
printfilterfield(data);
// function printfilterfield(data) {
//     let cn = '';
//     let sal = '';
//     let ex = '';
//     for (let i = 0; i < data.length; i++) {
//         cn += '<input type="checkbox" class="filter__item--cb" name="filterCompanyName" value = "' + data[i].companyName +'"> <span class="ic" id="filterCompanyName">' + data[i].companyName + '</span></br>';
//         sal += '<input type="checkbox" class="filter__item--cb" name="filterSalary" id="filterSalary" value = "' + data[i].Salary +'"> <span class="ic">' + data[i].Salary + '</span></br>';
//     }
//     document.getElementById('filter__comapny').innerHTML = cn;
//     document.getElementById('filter__salary').innerHTML = sal;
// }
// // fcn function
document.getElementById('filter_butt').addEventListener('click', function (e) {
    let ans = document.getElementById('filter__comapny').children;
    let ans1 = salrange.value;
    let charr = [];
    let scharr = [];
    for (let i = 0; i < ans.length; i+=3) {
        if(ans[i].checked == true){
            charr.push(ans[i].getAttribute('value'));
        }
        // if(ans1[i].checked == true){
        //     scharr.push(ans1[i].getAttribute('value'));
        // }
    }
    searchfilter(charr);
});
// Time Stamp Date
function convertDate(date) {
    let d = new Date(date);
    let months = d.getMonth() + 1;
    return (d.getDate() + '/' + months + '/' + d.getFullYear())
  };

//to store html collection
function getClick(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}
//store value of html collection
function localData(e) { 
    var x = getClick(e);
    console.log(x);
    var y = x.parentNode;
    console.log(y);
    localStorage.setItem("Position", y.children[2].children[1].innerText);
    localStorage.setItem("Company", y.children[0].children[0].innerText);
    
}
function searchfilter(input1, input2) {
    let xyz = [];
    let ans1 = salrange.value;
    const searchedData = data.filter((jobs) => {
       
        for (let i = 0; i < input1.length; i++) {
            // if (jobs.companyName.toLowerCase().includes(input1[i].toLowerCase()) === true) {
            //     xyz.push(jobs);
            // }
            // if (jobs.Salary >= ans1) {
            //     xyz.push(jobs);
            // }
            if(jobs.companyName.toLowerCase().includes(input1[i].toLowerCase()) === true && jobs.Salary >= ans1){
                xyz.push(jobs);
            }
        };

        if (input1.length === 0) {
            if (jobs.Salary >= ans1) {
                xyz.push(jobs);
            }
        }
        printjobs(xyz);
    });
    // console.log(searchedData);
};


