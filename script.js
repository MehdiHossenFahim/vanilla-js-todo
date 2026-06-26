
let taskList = [
    {
        "name": "Learn JavaScript",
        "subject": "Web Development",
        "priority": "high",
        "completed": false
    }
]
const year = new Date().getFullYear();

if (!taskList) {
    console.log("Task List is Empty. Add Task. ")
} else {
    generateTask();
}





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

    console.log(taskList);

    generateTask();
    this.reset()
});

// ----------------------------------
// -------- Delete Task -------------
// ----------------------------------

document.querySelector('main').addEventListener('click', (event) => {
    if (event.target.classList.contains('deletebtn')) {
        const itemIndex = event.target.id;
        console.log("Deleting index:", itemIndex);
        taskList.splice(Number(itemIndex), 1);

        generateTask();
        console.log(taskList.length);
        console.log(taskList);

    }
});
// ----------------------------------
//-------- Complete Task ------------
// ----------------------------------

document.querySelector('main').addEventListener('click', (event) => {
    if (event.target.classList.contains("completebtn")) {
        const itemIndex = Number(event.target.id);
        taskList[itemIndex].completed = true;
        console.log(itemIndex);

        generateTask();
    }
})




// ----------------------
// ---- Display Task ----
// ----------------------

function generateTask() {
    const findDiv = document.querySelectorAll(".task");
    if (findDiv) {
        findDiv.forEach(div => div.remove());
    }

    const findEmpty = document.querySelectorAll("#emptylist");



    if ((taskList.length > 0) && findEmpty) {
        findEmpty.forEach(div => div.remove());

    } else {
        const msg = document.createElement('div');
        msg.className = 'tasks';
        msg.innerHTML = "<h3>Task list is empty.</h3>";
        msg.id = 'emptylist';
        document.querySelector('main').appendChild(msg);
    }

    console.log(document.querySelector("#emptylist"));
    let status = "Incomplete";
    taskList.forEach((task, idx) => {

        const newDiv = document.createElement('div');
        if (task.completed) {
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

}


document.querySelector("#footerYear").textContent = year;