function fetchAndRenderTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => renderData(data))
        .catch(error => console.error(' fetching data:', error));
}

function renderData(todo) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todo.forEach(todo_api => {
        const listItem = document.createElement('li');
        listItem.textContent = `${todo_api.id}: ${todo_api.title}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => handleDelete(todo_api.id));

        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    });
}

function handleDelete(id) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
           
            const todoList = document.getElementById('todo-list');
            const items = todoList.getElementsByTagName('li');
            for (let i = 0; i < items.length; i++) {
                if (items[i].textContent.includes(`${id}:`)) {
                    todoList.removeChild(items[i]);
                    break;
                }
            }
        }
    })
    .catch(error => console.error(' deleting item:', error));
}

window.addEventListener('load', fetchAndRenderTodos);