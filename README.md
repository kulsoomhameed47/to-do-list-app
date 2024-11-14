
## Setup and Usage

1. **Clone the Repository**:
    ```bash
    git clone <https://github.com/kulsoomhameed47/to-do-list-app.io.git>
    ```

2. **Open the Project**:
   Open `index.html` in a web browser to view the interactive to-do list.

3. **Usage Instructions**:
   - Type a task in the input field and click "Add Task" to add it to the list.
   - Click on a task to mark it as complete or incomplete (toggle functionality).
   - Use the "Edit" (pencil icon) button to modify a task.
   - Use the "Delete" (× icon) button to remove a task.
   - Tasks are automatically saved to `localStorage`, so they will persist even after page reloads.

## Code Overview

### JavaScript

- **addTask**: Adds a new task to the list, including edit and delete buttons.
- **saveTasks**: Saves the task list to local storage.
- **getTasks**: Retrieves the task list from local storage.
- **renderTasks**: Renders the task list from local storage.
- **Event Listeners**: Listens for clicks on tasks to toggle completion, and on delete/edit icons for task management.

### CSS

- **Task Styling**: Styles each task item, complete/incomplete states, and interactive buttons (edit and delete).
- **Checked State**: Styles tasks with a line-through when they’re marked as complete.

## Future Enhancements

Some ideas for expanding this project:
- Add due dates for tasks.
- Implement task prioritization.
- Allow filtering tasks by complete/incomplete status.
- Add categories or tags for tasks.

## Contributing

Feel free to submit issues or pull requests if you'd like to improve this project. Contributions are welcome!

## License

This project is licensed under the MIT License.

## Contact

For questions or suggestions, feel free to reach out to [Kulsoom Hameed](mailto:kulsoomhameed47@gmail.com).
