
let taskList = [
    {
        "name": "Learn JavaScript",
        "subject": "Web Development",
        "priority": "high",
        "completed": false
    }
]
const year = new Date().getFullYear();

// console.log(taskList);
// taskList.forEach((task, idx) => {
//     console.log(idx);
//     console.log(task.name);
//     console.log(task.subject);
//     console.log(task.priority);
//     console.log(task.status);

// });



// ----------------------------------
//-------- Add Task to the list -----
// ----------------------------------
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const data = new FormData(this);
    // values from html
    // console.log(data.get("title"), data.get("subject"), data.get("priority"));
    taskList.push({
        "name": data.get("title"),
        "subject": data.get("subject"),
        "priority": data.get("priority"),
        "status": false
    });


    console.log(taskList);
    taskList.forEach((task, idx) => {
        console.log(`Task ${idx + 1}:`);
        console.log(task.name);
        console.log(task.subject);
        console.log(task.priority);
        console.log(task.completed);

    });
});




document.querySelector("#footerYear").textContent = year;