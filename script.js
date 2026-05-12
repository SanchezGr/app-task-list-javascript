// Отримуємо посилання на елементи DOM
const taskInput = document.getElementById('task-input');
const taskAddBtn = document.getElementById('task-add-btn');
const taskList = document.getElementById('task-list');


document.addEventListener('DOMContentLoaded', loadTaskList);


// Функція як для додавання нових завдань, так і для
// відтворення збереженого списку завдань з LocalStorage
function createTaskListElement(taskText, isCompleted) {
    const label = document.createElement('label');
    label.className = 'task-list-item';


    label.innerHTML = `
        <input type="checkbox" ${isCompleted ? 'checked' : ''} >
        <span class="task-checkmark"></span>
        <span class="task-text" contenteditable="true" spellcheck="false" onclick="">${taskText}</span>
        <button class="task-edit-btn" title="Редагувати завдання">✏️</button>
        <button class="task-done-btn" title="Змінити відмітку виконання завдання">✔</button>                
        <button class="task-task-delete-btn" title="Видалити завдання">✖</button>
    `;


    // Зберігаємо зміни, коли користувач клікає поза текстом (втрата фокусу)
    const textSpan = label.querySelector('.task-text');
    textSpan.addEventListener('blur', () => {
        // Перевіряємо, чи текст не порожній
        if (textSpan.innerText.trim() === "") {
            textSpan.innerText = "Введіть нове завдання"; // Запобігаємо зникненню елемента
        }
        // Відновлюємо стан кнопки редагування
        const isEditing = label.classList.contains('editing');
        if (isEditing) {
            label.classList.remove('editing');
            taskEditBtn.innerText = '✏️';
            taskEditBtn.title = "Редагувати завдання";
         }
        saveTaskList();
    });


     // Зберігаємо зміни при натисканні Enter
    textSpan.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Запобігаємо перенесенню рядка
            textSpan.blur();    // Викликаємо подію blur для збереження
           
        }
    });


     // Запобігаємо спрацюванню label при кліку на завданні
    textSpan.addEventListener('click', (e) => {
        e.preventDefault();
    });


    //label.addEventListener('click', (e) => {
    //    e.preventDefault();
    //});


    // Змінюємо відображення кнопки для редагування під час редагування
    textSpan.addEventListener('focus', (e) => {
        e.preventDefault();
        const isEditing = label.classList.contains('editing');
        if (!isEditing) {
            label.classList.add('editing');
            taskEditBtn.innerText = '💾';
            taskEditBtn.title = 'Завершіть редагування завдання натисненням клавіши "Enter"';
        }
    });


    // Подія для чекбокса: зберігаємо стан (виконано/не виконано)
    const checkbox = label.querySelector('input');
    checkbox.addEventListener('change', () => {
        saveTaskList(); // Зберігаємо після кліку
    });


    // Подія для кнопки видалення завдання
    const taskDeleteBtn = label.querySelector('.task-task-delete-btn');
    taskDeleteBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Запобігаємо спрацюванню label
        label.remove();
        saveTaskList(); // Зберігаємо після видалення
    });


    // Подія для кнопки зміни стану виконання завдання
    const taskDoneBtn = label.querySelector('.task-done-btn');
    taskDoneBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Запобігаємо спрацюванню label
        checkbox.checked = !checkbox.checked;
        saveTaskList(); // Зберігаємо після зміни стану
    });


     // Подія для кнопки редагування та збереження завдання
    const taskEditBtn = label.querySelector('.task-edit-btn');
    taskEditBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Запобігаємо спрацюванню label
        const isEditing = label.classList.contains('editing');
        if (isEditing) {
            textSpan.blur();
           
        } else {
            textSpan.focus();
        }
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


// Функція для обробки подій на елементах списку
function attachTaskListEvents(label) {
    // Зберігаємо зміни, коли користувач клікає поза текстом (втрата фокусу)
    const textSpan = label.querySelector('.task-text');
    textSpan.addEventListener('blur', () => {
        // Перевіряємо, чи текст не порожній
        if (textSpan.innerText.trim() === "") {
            textSpan.innerText = "Введіть нове завдання"; // Запобігаємо зникненню елемента
        }
        saveTaskList();
    });


    // Зберігаємо зміни при натисканні Enter
    textSpan.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Запобігаємо перенесенню рядка
            textSpan.blur();    // Викликаємо подію blur для збереження
        }
    });


    // Запобігаємо спрацюванню label при кліках
    textSpan.addEventListener('click', (e) => {
        e.preventDefault();
    });


    // Подія для чекбокса: зберігаємо стан (виконано/не виконано)
    const checkbox = label.querySelector('input');
    checkbox.addEventListener('change', () => {
        saveTaskList(); // Зберігаємо після кліку
    });


    // Подія для видалення завдання
    const taskDeleteBtn = label.querySelector('.task-task-delete-btn');
    taskDeleteBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Запобігаємо спрацюванню label
        label.remove();
        saveTaskList(); // Зберігаємо після видалення
    });


    // Подія для виконання завдання
    const taskDoneBtn = label.querySelector('.task-done-btn');
    taskDoneBtn.onclick = () => {
        checkbox.checked = !checkbox.checked;
        saveTaskList();
    };


    // Подія для редагування та збереження завдання
    const taskEditBtn = label.querySelector('.task-edit-btn');
    taskEditBtn.onclick = () => {
        textSpan.focus();
    };


    textSpan.focus = () => {
        const isEditing = label.classList.contains('editing');
        if (isEditing) {
            taskEditBtn.innerText = '✏️';
            label.classList.remove('editing');
        } else {
            taskEditBtn.innerText = '💾';
            label.classList.add('editing');
        }
    };  
}


// Навішуємо події на початкові завдання
document.querySelectorAll('#task-list label').forEach(attachTaskListEvents);


// Слухач кліку для кнопки додавання завдань
taskAddBtn.addEventListener('click', addTask);


// Дозволяємо додавати завдання натисканням клавіші Enter
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
