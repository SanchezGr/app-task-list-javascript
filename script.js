const taskInput = document.getElementById('task-input');
const taskAddBtn = document.getElementById('task-add-btn');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', loadTaskList);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Будь ласка, введіть текст завдання!");
        return;
    }

    createTaskListElement(taskText, false);
    saveTaskList();

    taskInput.value = "";
    taskInput.focus();
}

function createTaskListElement(taskText, isCompleted) {
    const label = document.createElement('label');
    label.className = 'task-list-item';

    label.innerHTML = `
        <input type="checkbox" ${isCompleted ? 'checked' : ''}>
        <span class="task-checkmark"></span>
        <span class="task-text" contenteditable="true" spellcheck="false">${taskText}</span>
        <button class="task-edit-btn" title="Редагувати завдання">✏️</button>
        <button class="task-done-btn" title="Змінити відмітку виконання завдання">✔</button>
        <button class="task-delete-btn" title="Видалити завдання">✖</button>
    `;

    attachTaskListEvents(label);
    taskList.appendChild(label);
}

function attachTaskListEvents(label) {
    const textSpan = label.querySelector('.task-text');
    const checkbox = label.querySelector('input');
    const taskDeleteBtn = label.querySelector('.task-delete-btn');
    const taskDoneBtn = label.querySelector('.task-done-btn');
    const taskEditBtn = label.querySelector('.task-edit-btn');

    textSpan.addEventListener('blur', () => {
        if (textSpan.innerText.trim() === "") {
            textSpan.innerText = "Введіть нове завдання";
        }

        label.classList.remove('editing');
        taskEditBtn.innerText = '✏️';
        taskEditBtn.title = "Редагувати завдання";

        saveTaskList();
    });

    textSpan.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            textSpan.blur();
        }
    });

    textSpan.addEventListener('click', (e) => {
        e.preventDefault();
    });

    textSpan.addEventListener('focus', () => {
        label.classList.add('editing');
        taskEditBtn.innerText = '💾';
        taskEditBtn.title = 'Зберегти зміни';
    });

    checkbox.addEventListener('change', () => {
        saveTaskList();
    });

    taskDeleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        label.remove();
        saveTaskList();
    });

    taskDoneBtn.addEventListener('click', (e) => {
        e.preventDefault();
        checkbox.checked = !checkbox.checked;
        saveTaskList();
    });

    taskEditBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (label.classList.contains('editing')) {
            textSpan.blur();
        } else {
            textSpan.focus();
        }
    });
}

function saveTaskList() {
    const myTaskList = [];

    document.querySelectorAll('.task-list-item').forEach(item => {
        myTaskList.push({
            text: item.querySelector('.task-text').innerText.trim(),
            completed: item.querySelector('input').checked
        });
    });

    localStorage.setItem('myTaskList', JSON.stringify(myTaskList));
}

function loadTaskList() {
    const staticTaskList = document.querySelectorAll('.task-list-item');

    staticTaskList.forEach(item => {
        item.remove();
    });

    const savedTaskList = localStorage.getItem('myTaskList');

    if (savedTaskList) {
        const myTaskList = JSON.parse(savedTaskList);

        myTaskList.forEach(task => {
            createTaskListElement(task.text, task.completed);
        });
    }
}

taskAddBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});