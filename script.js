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
// Отримуємо посилання на елементи DOM
const taskInput = document.getElementById('task-input');
const taskAddBtn = document.getElementById('task-add-btn');
const taskList = document.getElementById('task-list');


// Відтворюємо список завдань з LocalStorage
document.addEventListener('DOMContentLoaded', loadTaskList);
 
// Функція для додавання до списку завдань нового завдання
// з урахуванням збереження списку завдань у LocalStorage
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
 
    createTaskListElement(taskText, false);
    saveTaskList(); // Зберігаємо після додавання
 
    taskInput.value = "";
    taskInput.focus();
}
 
// Функція як для створення нових завдань 
// з добавленням кнопки видалення, так і для
// відтворення збереженого списку завдань з LocalStorage
function createTaskListElement(taskText, isCompleted) {
    // Створюємо елемент завдання (контейнер label)
    const label = document.createElement('label');
    label.className = 'task-list-item';
 
    // Наповнюємо його структурними елементами
    label.innerHTML = `
        <input type="checkbox" ${isCompleted ? 'checked' : ''}>
        <span class="task-checkmark"></span>
        <span class="task-text">${taskText}</span>
        <button class="task-delete-btn" title="Видалити завдання">✖</button>
    `;
 
    // Додаємо подію для checkbox зміни стану виконання завдання
    const checkbox = label.querySelector('input');
    checkbox.addEventListener('change', () => {
        saveTaskList(); // Зберігаємо після кліку
    });
 
    // Додаємо подію для кнопки видалення завдання
    const taskDeleteBtn = label.querySelector('.task-delete-btn');
    taskDeleteBtn.addEventListener('click', () => {
        label.remove(); // Видаляємо завдання
        saveTaskList(); // Зберігаємо після видалення
    });
 
    taskList.appendChild(label);
}
 
//Функція для збереження всіх завдань у LocalStorage
function saveTaskList() {
    const myTaskList = [];
    document.querySelectorAll('.task-list-item').forEach(item => {
        myTaskList.push({
            text: item.querySelector('.task-text').innerText,
            completed: item.querySelector('input').checked
        });
    });
    // Перетворюємо масив об'єктів у рядок JSON
    localStorage.setItem('myTaskList', JSON.stringify(myTaskList));
}
 
// Функція для завантаження списку завдань з LocalStorage
function loadTaskList() {
    // Видаляємо зі списку завдань всі статичні завдання
    staticTaskList = document.querySelectorAll('.task-list-item');
    staticTaskList.forEach(item => {
        item.remove();
    });
 
    // Додаємо у список завдань всі завдання з LocalStorage
    const savedTaskList = localStorage.getItem('myTaskList');
    if (savedTaskList) {
        const myTaskList = JSON.parse(savedTaskList);
        myTaskList.forEach(myTaskList => {
            createTaskListElement(myTaskList.text, myTaskList.completed);
        });
    }
}
 
// Додаємо слухач кліку для кнопки додавання нових завдань
taskAddBtn.addEventListener('click', addTask);
 
// Дозволяємо додавати завдання натисканням клавіші Enter
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});


// Функція для обробки подій на елементах списку
function attachTaskListEvents(label) {
    // Додаємо подію для кнопки видалення
    const taskDeleteBtn = label.querySelector('.task-delete-btn');
    taskDeleteBtn.addEventListener('click', () => {
        label.remove();
        saveTaskList();
    });


    // Додаємо подію для checkbox зміни стану виконання завдання
    const checkbox = label.querySelector('input');
    checkbox.addEventListener('change', () => {
        saveTaskList();
    });
}
 
// Навішуємо функцію обробки подій на статичні елементи списку
document.querySelectorAll('#task-list label').forEach(attachTaskListEvents);
 
