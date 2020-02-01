$( document ).ready(function() {
});

$('#currentDay').text(moment().format('dddd, MMMM Do'));

let planner;

function getPlanner() {
    let savedData = localStorage.getItem('planner');
    savedData = JSON.parse(savedData);
    if (savedData === null) {
        planner = {
            9: '',
            10: '',
            11: '',
            12: '',
            13: '',
            14: '',
            15: '',
            16: '',
            17: ''
        }
    } else {
        planner = savedData;
    }
}

function savePlanner() {
    let savedPlanner = JSON.stringify(planner);
    localStorage.setItem('planner', savedPlanner);
}

function saveChange(event) {
   let row = event.target.parentNode.parentNode.parentNode;
   let textarea = row.querySelector('textarea');
   let hour = row.querySelector('.time-block h1').dataset.milTime;
   if (textarea.value!=='') {
       planner[hour]= textarea.value;
       savePlanner();
   }
}

function setButtonEvent() {
    var btns = document.querySelectorAll('i');
    btns.forEach(function(btn){
        btn.addEventListener('click', saveChange);
    });
}

function populateCurrentSchedule() {
    getPlanner();
    var rows = $(".row");
    for (let i=0; i < rows.length; i++)
    {
        var currentHour = rows[i].querySelector('h1').dataset.milTime;
        if (planner[currentHour]!=='') {
            rows[i].querySelector('textarea').value =planner[currentHour];
        }
        
    };
}

function colorTimeslots() {
    var hour =  moment().hour();
    var rows = $(".row");
    for (let i=0; i < rows.length; i++)
    {
        var currentHour = rows[i].querySelector('h1');
        if (parseInt(currentHour.dataset.milTime) < hour) {
            rows[i].querySelector('textarea').classList.add('past');
        }
        if (parseInt(currentHour.dataset.milTime) === hour) {
            rows[i].querySelector('textarea').classList.add('present');
        }
        if (parseInt(currentHour.dataset.milTime) > hour) {
            rows[i].querySelector('textarea').classList.add('future');
        }
    };

}

populateCurrentSchedule();
colorTimeslots();
setButtonEvent();