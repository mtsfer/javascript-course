const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList();

function renderTodoList() {
    let todoListHTML = "";

    for (let i = 0; i < todoList.length; i++) {
        const {name, dueDate} = todoList[i];

        // Generating the HTML using JavaScript
        const html = `
          <div>${name}</div
          <div>${dueDate}</div>
          <button onclick="
            todoList.splice(${i}, 1);
            renderTodoList();
            updateStorage();
          " class="delete-todo-button">Delete</button>
        `;
        todoListHTML += html;
    }

    document.querySelector(".js-todo-list").innerHTML = todoListHTML;
}

function addTodo() {
    const inputElement = document.querySelector(".js-name-input");
    const name = inputElement.value;

    const dateInputElement = document.querySelector(".js-due-date-input");
    const dueDate = dateInputElement.value;

    todoList.push({name, dueDate}); // shorthand property syntax (when property and value names are equal)

    inputElement.value = "";

    renderTodoList();
    updateStorage();
}

function updateStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}