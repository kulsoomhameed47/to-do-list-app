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

listContainer.addEventListener("click", function(e) {
    let tasks = getTasks();
    const listItems = Array.from(listContainer.children);

    // Delete task
    if (e.target.tagName === "SPAN" && e.target.classList.contains("delete")) {
        const index = listItems.indexOf(e.target.parentElement); // Find the correct index of the clicked task
        tasks.splice(index, 1); // Remove only the specific task from the array
        saveTasks(tasks); // Save updated tasks to local storage
        renderTasks(); // Re-render the list
    }

    // Toggle task completion
    else if (e.target.tagName === "SPAN" && e.target.classList.contains("task-text")) {
        const index = listItems.indexOf(e.target.parentElement);
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
        renderTasks();
    }
}, false);


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

        // Create button container for edit and delete buttons
        let buttons = document.createElement("div");

        // Edit button
        let editBtn = document.createElement("button");
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            const newTaskText = prompt("Edit your task:", task.text);
            if (newTaskText !== null) {
                task.text = newTaskText;
                saveTasks(tasks);
                renderTasks();
            }
        });

        // Delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1); // Remove the task from the array
            saveTasks(tasks); // Save updated tasks to local storage
            renderTasks(); // Re-render the list
        });

        // Append buttons to the button container and task item
        buttons.appendChild(editBtn);
        buttons.appendChild(deleteBtn);
        li.appendChild(buttons);

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
