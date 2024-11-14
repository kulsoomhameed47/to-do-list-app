function addTask() {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.querySelector(".list-container");

    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let task = { text: inputBox.value, completed: false };
        let tasks = getTasks();
        tasks.push(task);
        saveTasks(tasks);
        renderTasks();
    }
    inputBox.value = ''; 
}

document.addEventListener("DOMContentLoaded", function() {
    renderTasks();

    const listContainer = document.querySelector(".list-container");

    listContainer.addEventListener("click", function(e) {
        let tasks = getTasks();
        if (e.target.tagName === "LI") {
            const index = Array.from(listContainer.children).indexOf(e.target);
            tasks[index].completed = !tasks[index].completed;
            saveTasks(tasks);
            renderTasks();
        } else if (e.target.tagName === "SPAN" && e.target.classList.contains("delete")) {
            const index = Array.from(listContainer.children).indexOf(e.target.parentElement);
            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks();
        } else if (e.target.tagName === "SPAN" && e.target.classList.contains("edit")) {
            const index = Array.from(listContainer.children).indexOf(e.target.parentElement);
            const newTaskText = prompt("Edit your task:", tasks[index].text);
            if (newTaskText !== null) {
                tasks[index].text = newTaskText;
                saveTasks(tasks);
                renderTasks();
            }
        }
    }, false);
});

function renderTasks() {
    const listContainer = document.querySelector(".list-container");
    const tasks = getTasks();
    listContainer.innerHTML = '';

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add("checked");
        }

        let deleteSpan = document.createElement("span");
        deleteSpan.innerHTML = "\u00d7";
        deleteSpan.classList.add("delete");
        li.appendChild(deleteSpan);

        let editSpan = document.createElement("span");
        editSpan.innerHTML = "\u270E";  
        editSpan.classList.add("edit");
        li.appendChild(editSpan);

        listContainer.appendChild(li);
    });
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}
