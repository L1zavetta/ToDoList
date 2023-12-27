const tasksLocalStorageKey =  'TasksLocalStorageKey';
const tasksJson = localStorage.getItem(tasksLocalStorageKey);
let tasks = [];

if (tasksJson !== '' && tasksJson !== null) {
    tasks = JSON.parse(tasksJson);
}

renderTasks(tasks);

document.getElementById('allTasks')
    .addEventListener('click', function () {
      renderTasks(tasks);
    })

document.getElementById('completed')
    .addEventListener('click', function () {
      renderTasks(tasks.filter(el => el.done));
    })

document.getElementById('notCompleted')
    .addEventListener('click', function () {
      renderTasks(tasks.filter(el => !el.done));
    })

document.getElementById('add')
    .addEventListener('click', function () {
      let task = document.getElementById('body');
      let title = document.getElementById('title');
      let obj = {
          title: title.value,
          aim: task.value,
          done: false,
      }

      if (task.value !== '') {
        tasks.push(obj);
      }

      renderTasks(tasks);
    })

function createTask(taskList, tasks) {
    for (const task of tasks) {
        let item = document.createElement('li');
        item.setAttribute('class', 'list-group-item d-flex align-items-center flex-wrap border rounded mt-4');

        let taskTitle = document.createElement('p');
        taskTitle.setAttribute('class', 'mt-1 w-100 fw-bold fs-5');
        taskTitle.textContent = task.title;

        let taskText = document.createElement('p');
        taskText.setAttribute('class', 'mt-1 w-100');
        taskText.textContent = task.aim;

        taskList.appendChild(item);
        item.appendChild(taskTitle);
        item.appendChild(taskText);

        if (task.done) {
            let mark = document.createElement('i');
            mark.setAttribute('class', 'bi bi-check2-square me-2');
            taskTitle.prepend(mark);
        }

        createDoneButton(item, task);
        createDeleteButton(item, task);
    }
}

function renderTasks(tasks) {
    localStorage.setItem(tasksLocalStorageKey, JSON.stringify(tasks));
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    showMessage();

    createTask(taskList, tasks);
}

function createDoneButton(item, task) {
    const doneButton = document.createElement('button');
    doneButton.setAttribute('value', `${tasks.indexOf(task)}`);
    doneButton.setAttribute('class', 'btn btn-outline-success mx-1')
    doneButton.textContent = 'Done';
    item.appendChild(doneButton);

    doneButton.addEventListener('click', function (e) {
        const taskIndex = e.target.value;
        tasks[taskIndex].done = !tasks[taskIndex].done;
        renderTasks(tasks);
    })
}

function createDeleteButton(item, task) {
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('value', `${tasks.indexOf(task)}`);
    deleteButton.setAttribute('class', 'btn btn-outline-danger mx-1');
    deleteButton.textContent = 'Delete';
    item.appendChild(deleteButton);

    deleteButton.addEventListener('click', function (e) {
        let taskIndex = Number(e.target.getAttribute('value'));
        tasks.splice(taskIndex, 1);
        renderTasks(tasks);
    })
}

function showMessage() {
    const message = document.getElementById('message');

    if (tasks.length === 0 && !message.contains(document.getElementById('notification'))) {
        const notification = document.createElement('div');
        message.appendChild(notification)
        notification.setAttribute('class', 'alert alert-primary');
        notification.setAttribute('id', 'notification');
        notification.textContent = 'There are no tasks';
    }
}
