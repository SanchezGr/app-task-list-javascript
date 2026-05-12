const taskInput = document.getElementById('task-input');
const taskAddBtn = document.getElementById('task-add-btn');
const taskList = document.getElementById('task-list');

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Будь ласка, введіть текст завдання!");
        return;
    }

    const label = document.createElement('label');
    label.className = 'task-list-item';

    label.innerHTML = `
        <input type="checkbox">
        <span class="task-checkmark"></span>
        <span class="task-text">${taskText}</span>
        <button class="task-delete-btn" title="Видалити завдання">✖</button>
    `;

    attachTaskEvents(label);

    taskList.appendChild(label);

    taskInput.value = "";
    taskInput.focus();
}

function attachTaskEvents(label) {
    const taskDeleteBtn = label.querySelector('.task-delete-btn');

    taskDeleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        label.remove();
    });
}

document.querySelectorAll('#task-list label').forEach(attachTaskEvents);

taskAddBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});