function openFeature() {
    const allElems = document.querySelectorAll('.elem');
    let fullelems = document.querySelectorAll('.fullElem');
    let allbackbtn = document.querySelectorAll('.fullElem .back');

    allElems.forEach((elem) => {
        elem.addEventListener('click', () => {
            fullelems[elem.id].style.display = 'block';

        })
    })
    allbackbtn.forEach((back) => {
        back.addEventListener('click', () => {
            fullelems[back.id].style.display = "none"

        })
    })
}
openFeature();



// localStorage.clear();


function todolist() {
    var currentTask = []
    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))

    } else {
        console.log('task list is empty');




    }




    function renderTask() {
        localStorage.setItem('currentTask', JSON.stringify(currentTask));

        var allTask = document.querySelector('.allTask')
        let sum = '';
        currentTask.forEach((elem, idx) => {
            sum += `<div class="task">
        <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
        <button id=${idx}>mark as Completed</button>
        
        </div>`

        })

        allTask.innerHTML = sum;
        document.querySelectorAll('.task button').forEach((btn) => {
            btn.addEventListener('click', () => {
                currentTask.splice(btn.id, 1)
                renderTask()
            })
        })

    }
    renderTask();

    let form = document.querySelector('.addTask form');
    let taskInput = document.querySelector('.addTask form #task-input')
    let taskDetailsInput = document.querySelector('.addTask form textarea');
    let taskCheckbox = document.querySelector('.addTask form #check');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        currentTask.push(
            {
                task: taskInput.value,
                details: taskDetailsInput.value,
                imp: taskCheckbox.checked
            }
        )
        renderTask()
        taskCheckbox.checked = false
        taskInput.value = ""
        taskDetailsInput.value = ""

    })
}
todolist();

function dailyPlanner() {
    var dayPlanner = document.querySelector('.day-planner')

    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)

    let wholeDaysum = ''

    hours.forEach((elem, idx) => {
        var savedData = dayPlanData[idx] || ''
        wholeDaysum += `
        <div class="day-planner-time">
            <p>${elem}</p>
            <input id="${idx}" type="text" placeholder="..." value="${savedData}">
        </div>`
    })

    dayPlanner.innerHTML = wholeDaysum

    document.querySelectorAll('.day-planner input').forEach((elem) => {
        elem.addEventListener('input', () => {
            dayPlanData[elem.id] = elem.value
            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}

dailyPlanner()


function motivationalQuotes() {
    var motivationQuote = document.querySelector('.motivation-2 h1')
    var motivationAuthor = document.querySelector('.motivation-3 h2')

    async function fetchQuote() {
        let response = await fetch('https://api.quotable.io/random')
        let data = await response.json()
        motivationQuote.innerHTML = data.content
        motivationAuthor.innerHTML = data.author
    }
    fetchQuote()
}
motivationalQuotes();


function pomodorotimerhai() {
    let timer = document.querySelector('.pomo-timer h1');
    let startBtn = document.querySelector('.pomo-timer .start-timer')
    let pauseBtn = document.querySelector('.pomo-timer .pause-timer')
    let resetBtn = document.querySelector('.pomo-timer .reset-timer')
    let session = document.querySelector('.Phomodoro-timer-fullpage .session')
    let isWorksession = true

    var timerInterval = null
    let totalSeconds = 25 * 60;
    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60;

        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`


    }
    function startTimer() {
        clearInterval(timerInterval)

        if (isWorksession) {


            totalSeconds = 25 * 60
            timerInterval = setInterval(() => {
                if (totalSeconds > 0) {

                    totalSeconds--
                    updateTimer()
                } else {
                    isWorksession = false
                    clearInterval(timerInterval)
                    timer.innerHTML = '05:00'
                    session.innerHTML = 'Break session'
                    session.style.backgroundColor = 'var(--red)'
                }

            }, 1000);
        } else {

            totalSeconds = 5 * 60
            timerInterval = setInterval(() => {
                if (totalSeconds > 0) {

                    totalSeconds--
                    updateTimer()
                } else {
                    isWorksession = true
                    clearInterval(timerInterval)
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work session'
                    session.style.backgroundColor = 'var(--green)'



                }

            }, 1000);
        }




    }
    function puaseTimer() {
        clearInterval(timerInterval)
    }
    function resetTimer() {
        totalSeconds = 25 * 60
        clearInterval(timerInterval)
        updateTimer()
    }
    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', puaseTimer)
    resetBtn.addEventListener('click', resetTimer)

}
pomodorotimerhai();





function dailyGoals() {
    let goals = JSON.parse(localStorage.getItem('dailyGoals')) || [];

    const taskContainer = document.querySelector('.dailyAllTask');
    const form = document.querySelector('.dailyAddTask form');
    const taskInput = document.querySelector('#daily-task-input');
    const checkbox = document.querySelector('#daily-check');

    function renderGoals() {
        localStorage.setItem('dailyGoals', JSON.stringify(goals));

        let html = '';
        goals.forEach((goal, idx) => {
            html += `
            <div class="daily-task ${goal.imp ? 'important' : ''}">
                <h4>${goal.task}</h4>
                <button data-id="${idx}">Done</button>
            </div>`;
        });

        taskContainer.innerHTML = html;

        taskContainer.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                goals.splice(btn.dataset.id, 1);
                renderGoals();
            });
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (taskInput.value.trim() === '') return;

        goals.push({
            task: taskInput.value,
            imp: checkbox.checked
        });

        taskInput.value = '';
        checkbox.checked = false;

        renderGoals();
    });

    renderGoals();
}

dailyGoals();



function weatherfunction(){
    let apiKey = "8ff2f87e669d401980a94857252312";
let city = "Jabalpur";

var header1Date = document.querySelector('.header1 h1')
var header1Date2 = document.querySelector('.header1 h2')
var header2temp = document.querySelector('.header2 h2')
var header2tcloud = document.querySelector('.header2 h4')
var header2preci = document.querySelector('.header2 .preci')
var header2humidity = document.querySelector('.header2 .Humidity')
var header2wind = document.querySelector('.header2 .wind')


var data = null;
async function weatherapi() {
    const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );

    const data = await response.json();
    header2temp.innerHTML=`${data.current.temp_c}°C`
    header2tcloud.innerHTML=`${data.current.condition.text}`
    header2preci.innerHTML=`Precipitation:${data.current.heatindex_c} %`
    header2humidity.innerHTML=`Humidity:${data.current.humidity}%`
    header2wind.innerHTML=`wind:${data.current.wind_kph} km/h`
}

weatherapi();
var date = null

function timeDate() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const daysOfmonths = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    date = new Date
    var totalday = daysOfWeek[date.getDay()]
    var ghanta = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    var dates = date.getDate()
    var month = daysOfmonths[date.getMonth()]
    var year = date.getFullYear()

    header1Date2.innerHTML = ` ${dates} ${month} ${year}`
    if (ghanta > 12) {
        header1Date.innerHTML = `${totalday},${String(ghanta-12).padStart('2','0')  }:${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')}pm`
      

    } else {
        header1Date.innerHTML = `${totalday},${String(ghanta-12).padStart('2','0') }:${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')}am`

    }
}
setInterval(()=>{
    timeDate()

},1000)



}
weatherfunction();



function changetheme(){
    var theme=document.querySelector('.theme')
var rootElement=document.documentElement
var flag=0;
theme.addEventListener('click',()=>{

    if(flag===0){
        rootElement.style.setProperty('--pri','#FCDEC0')
    rootElement.style.setProperty('--sec','#222831')
    rootElement.style.setProperty('--tri1','#948973')
    rootElement.style.setProperty('--tri2','#393E42')
    flag=1
    }else if(flag==1){
        rootElement.style.setProperty('--pri','#000000')
    rootElement.style.setProperty('--sec','#0C2B4E')
    rootElement.style.setProperty('--tri1','#1A3D64')
    rootElement.style.setProperty('--tri2',' #1D546C')
    flag=2
    }else if(flag==2){
         rootElement.style.setProperty('--pri','#FCDEC0')
    rootElement.style.setProperty('--sec','#451609')
    rootElement.style.setProperty('--tri1','#f39600')
    rootElement.style.setProperty('--tri2',' #9c3604')
    flag=0

    }

})
}
changetheme();