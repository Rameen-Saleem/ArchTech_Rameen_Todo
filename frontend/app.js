document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoDatetime = document.getElementById('todo-datetime');
    const todoList = document.getElementById('todo-list');

    // --- Todo logic ---
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function formatDateTime(dt) {
        if (!dt) return '';
        const d = new Date(dt);
        return d.toLocaleString(undefined, {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true
        });
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-row';

            // Main content
            const main = document.createElement('div');
            main.className = 'todo-main';

            const title = document.createElement('div');
            title.className = 'todo-title';
            title.textContent = todo.text;

            const date = document.createElement('div');
            date.className = 'todo-date';
            date.textContent = formatDateTime(todo.datetime);

            main.appendChild(title);
            main.appendChild(date);

            // Status badge
            const status = document.createElement('span');
            status.className = 'todo-status ' + (todo.completed ? 'completed' : 'pending');
            status.textContent = todo.completed ? 'Completed' : 'Pending';
            status.addEventListener('click', () => {
                todos[index].completed = !todos[index].completed;
                saveTodos();
                renderTodos();
            });

            // Edit button
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.title = 'Edit todo';
            editBtn.innerHTML = '✏️';
            editBtn.addEventListener('click', () => {
                const newText = prompt('Edit todo:', todo.text);
                if (newText !== null && newText.trim() !== '') {
                    todos[index].text = newText.trim();
                    saveTodos();
                    renderTodos();
                }
            });

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.title = 'Delete todo';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.addEventListener('click', () => {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });

            // Right arrow
            const arrow = document.createElement('span');
            arrow.className = 'todo-arrow';
            arrow.innerHTML = '&#8250;';

            li.appendChild(main);
            li.appendChild(status);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            li.appendChild(arrow);
            todoList.appendChild(li);
        });
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        const datetime = todoDatetime.value;
        if (text && datetime) {
            todos.push({ text, datetime, completed: false });
            saveTodos();
            renderTodos();
            todoInput.value = '';
            todoDatetime.value = '';
        }
    });

    // --- Notes, Focus, Remember logic (unchanged) ---
    const notesArea = document.querySelector('.notes-area');
    const focusArea = document.querySelector('.focus-area');
    const rememberArea = document.querySelector('.remember-area');
    const clearNotesBtn = document.getElementById('clear-notes');
    const clearFocusBtn = document.getElementById('clear-focus');
    const clearRememberBtn = document.getElementById('clear-remember');

    notesArea.value = localStorage.getItem('notes') || '';
    focusArea.value = localStorage.getItem('focus') || '';
    rememberArea.value = localStorage.getItem('remember') || '';

    notesArea.addEventListener('input', () => {
        localStorage.setItem('notes', notesArea.value);
    });
    focusArea.addEventListener('input', () => {
        localStorage.setItem('focus', focusArea.value);
    });
    rememberArea.addEventListener('input', () => {
        localStorage.setItem('remember', rememberArea.value);
    });

    clearNotesBtn.addEventListener('click', () => {
        notesArea.value = '';
        localStorage.removeItem('notes');
    });
    clearFocusBtn.addEventListener('click', () => {
        focusArea.value = '';
        localStorage.removeItem('focus');
    });
    clearRememberBtn.addEventListener('click', () => {
        rememberArea.value = '';
        localStorage.removeItem('remember');
    });

    renderTodos();
}); 