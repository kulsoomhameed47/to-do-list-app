function addTask() {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.querySelector(".list-container");

    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        // Create a task object with text and completion status
        let task = { text: inputBox.value, completed: false };
        let tasks = getTasks(); // Retrieve existing tasks
        tasks.push(task); // Add new task
        saveTasks(tasks); // Save updated tasks to local storage
        renderTasks(); // Render tasks
    }
    inputBox.value = ''; // Clear the input box after adding
}

document.addEventListener("DOMContentLoaded", function() {
    renderTasks(); // Render tasks on page load

    const listContainer = document.querySelector(".list-container");

    listContainer.addEventListener("click", function(e) {
        let tasks = getTasks();
        const listItems = Array.from(listContainer.children);

        // Toggle task completion
        if (e.target.tagName === "LI") {
            const index = listItems.indexOf(e.target);
            tasks[index].completed = !tasks[index].completed;
            saveTasks(tasks);
            renderTasks();

        // Delete task
        } else if (e.target.tagName === "SPAN" && e.target.classList.contains("delete")) {
            const index = listItems.indexOf(e.target.parentElement); // Get the task's index
            tasks.splice(index, 1); // Remove the task from the array
            saveTasks(tasks); // Save updated tasks to local storage
            renderTasks(); // Re-render the list

        // Edit task
        } else if (e.target.tagName === "SPAN" && e.target.classList.contains("edit")) {
            const index = listItems.indexOf(e.target.parentElement); // Get the task's index
            const newTaskText = prompt("Edit your task:", tasks[index].text);
            if (newTaskText !== null) { // Check if user entered a new task text
                tasks[index].text = newTaskText; // Update task text
                saveTasks(tasks);
                renderTasks();
            }
        }
    }, false);
});

function renderTasks() {
    const listContainer = document.querySelector(".list-container");
    const tasks = getTasks();
    listContainer.innerHTML = ''; // Clear existing tasks

    // Render each task
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add("checked"); // Apply 'checked' class if completed
        }

        // Delete button
        let deleteSpan = document.createElement("span");
        deleteSpan.innerHTML = "\u00d7"; // Unicode for delete icon
        deleteSpan.classList.add("delete");
        li.appendChild(deleteSpan);

        // Edit button
        let editSpan = document.createElement("span");
        editSpan.innerHTML = "\u270E"; // Unicode for pencil icon
        editSpan.classList.add("edit");
        li.appendChild(editSpan);

        listContainer.appendChild(li);
    });
}

// Save tasks array to local storage
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Retrieve tasks array from local storage
function getTasks() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}
