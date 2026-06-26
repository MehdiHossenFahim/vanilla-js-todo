"use strict";
let taskList = [
    {
        "name": "Learn JavaScript",
        "subject": "Web Development",
        "priority": "high",
        "completed": false
    }
]
const year = new Date().getFullYear();
generateTask(taskList);



// ----------------------------------
//-------- Add Task to the list -----
// ----------------------------------
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const data = new FormData(this);
    taskList.push({
        "name": data.get("title"),
        "subject": data.get("subject"),
        "priority": data.get("priority"),
        "completed": false
    });

    // console.log(taskList);

    generateTask(taskList);
    this.reset()
});

// ----------------------------------
// -------- Delete Task -------------
// ----------------------------------

document.querySelector('main').addEventListener('click', (event) => {
    if (event.target.classList.contains('deletebtn')) {
        const itemIndex = event.target.id;
        // console.log("Deleting index:", itemIndex);
        taskList.splice(Number(itemIndex), 1);

        generateTask(taskList);
        taskCounter();
        // console.log(taskList.length);
        // console.log(taskList);

    }
});
// ----------------------------------
//-------- Complete Task ------------
// ----------------------------------

document.querySelector('main').addEventListener('click', (event) => {
    if (event.target.classList.contains("completebtn")) {
        const itemIndex = Number(event.target.id);
        taskList[itemIndex].completed = true;
        // console.log(itemIndex);
        generateTask(taskList);
    }
})


// ----------------------------------
// -------- Filter Task -------------
// ----------------------------------

const radios = document.querySelectorAll('input[name="toggle-buttons"]');

radios.forEach(radio => {
    radio.addEventListener('change', (event) => {
        // console.log(event.target.value);
        const key = event.target.value;
        switch (key) {
            case 'all':
                generateTask(taskList);
                break;
            case 'completed':
                const doneTask = taskList.filter(task => task.completed === true);
                generateTask(doneTask);
                break;
            case 'pending':
                const pendingTask = taskList.filter(task => task.completed === false);
                generateTask(pendingTask);
                break;

            default:
                break;
        }

    });
});



// ----------------------
// ---- Display Task ----
// ----------------------

function generateTask(taskList) {
    document.querySelectorAll(".task").forEach(div => div.remove());


    document.querySelectorAll("#emptylist").forEach(div => div.remove());

    if (taskList.length > 0) {
        taskCounter();
        let status = "Incomplete";
        taskList.forEach((task, idx) => {

            const newDiv = document.createElement('div');
            if (task.completed === true) {
                status = "Complete";
                newDiv.className = 'task complete';
            } else {
                newDiv.className = 'task incomplete';
            }
            newDiv.id = 'taskItems'
            newDiv.innerHTML = `<h3>Task ${idx + 1}</h3>
        <p><b>Name:</b> ${task.name}</p>
        <p><b>Subject:</b> ${task.subject}</p>
        <p><b>Priority:</b> ${task.priority}</p>
        <p><b>Status:</b> ${status}</p>
        <div class="buttons">
            <button name="complete" id="${idx}" class="taskbtn completebtn">Complete</button>
            <button name="delete" id="${idx}" class="taskbtn deletebtn">Delete</button>
        </div>`
            const mainElement = document.querySelector('main');
            mainElement.appendChild(newDiv);
        });

    } else {
        const msg = document.createElement('div');
        msg.className = 'tasks';
        msg.innerHTML = "<h3>Task list is empty.</h3>";
        msg.id = 'emptylist';
        document.querySelector('main').appendChild(msg);
    }

}
// ----------------------
// ----- Task Counter ---
// ----------------------

function taskCounter() {
    const completedTask = taskList.filter(task => task.completed === true);
    const pendingTask = taskList.filter(task => task.completed === false);

    document.querySelector('#total').textContent = taskList.length;
    document.querySelector('#completed').textContent = completedTask.length;
    document.querySelector('#pending').textContent = pendingTask.length;
}

function updateDateTime() {
    const now = new Date();
    const dateOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    const dateStr = now.toLocaleDateString('en-GB', dateOptions);

    const timeOptions = {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };

    const timeStr = now.toLocaleTimeString('en-GB', timeOptions);

    document.querySelector('#date').textContent = dateStr;
    document.querySelector('#time').textContent = timeStr.toUpperCase();
}

updateDateTime();
setInterval(updateDateTime, 1 * 1000);
const themeBtn = document.getElementById("theme");

//------------------------
//---- Toggle Theme ------
//------------------------

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️ Light";
} else {
    themeBtn.textContent = "🌙 Dark";
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "☀️ Light";
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "🌙 Dark";
    }
});
document.querySelector("#footerYear").textContent = year;