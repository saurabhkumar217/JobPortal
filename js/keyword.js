displayItem = document.getElementById('display_item');
// function for keyword search
searchbk.addEventListener('click', (e) => {
    displayItem.classList.add('active');
    document.getElementById('change-jh').innerHTML = "Searched Jobs"
    const inputstr = document.getElementById('searchkey').value.toLowerCase();
    if (inputstr.length > 0) {
        const searchedData = data.filter((jobs) => {
            return (
                jobs.companyName.toLowerCase().includes(inputstr) ||
                jobs.Position.toLowerCase().includes(inputstr) ||
                jobs.experienceLevel.toLowerCase().includes(inputstr) ||
                jobs.Location.toLowerCase().includes(inputstr) ||
                jobs.hiringLevel.toLowerCase().includes(inputstr)
            );
        });
        printjobs(searchedData);
    } else {
        displayItem.classList.add('hidden');
    }
});
// loadData();