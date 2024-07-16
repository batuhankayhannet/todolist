let tasks = [];
let currentFilter = 'all';
let isDarkMode = false;

const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date');
const prioritySelect = document.getElementById('priority');
const addTaskBtn = document.getElementById('add-task-btn');
const toggleThemeBtn = document.getElementById('toggle-theme');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const filterButtons = document.querySelectorAll('.filter-btn');

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

toggleThemeBtn.addEventListener('click', toggleTheme);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentFilter = button.dataset.filter;
        updateTaskList();
        updateTaskCount();
    });
});

function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;

    if (taskText !== '') {
        const newTask = {
            text: taskText,
            completed: false,
            dueDate: dueDate,
            priority: priority
        };
        tasks.push(newTask);
        taskInput.value = '';
        dueDateInput.value = '';
        updateTaskList();
        updateTaskCount();
    }
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateTaskCount();
}

function editTask(index) {
    const newTaskText = prompt("Edit task:", tasks[index].text);
    if (newTaskText) {
        tasks[index].text = newTaskText;
        updateTaskList();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
    updateTaskCount();
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    updateTaskList();
}

function updateTaskList() {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'completed') return task.completed;
        if (currentFilter === 'active') return !task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${task.text} (Due: ${task.dueDate}) - Priority: ${task.priority}`;
        if (task.completed) {
            li.classList.add('completed');
        }

        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.addEventListener('click', () => toggleTaskCompletion(index));

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => editTask(index));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(index));

        li.appendChild(completeBtn);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function updateTaskCount() {
    taskCount.textContent = `Task Count: ${tasks.length}`;
}

// Initial task list update
updateTaskList();
updateTaskCount();
