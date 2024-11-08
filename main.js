const addTask = document.getElementById('add-task');
const dialogTask = document.getElementById('input-task');
const exitBtn = document.getElementById('exit-btn');
const taskHolder = document.getElementById('task-holder');
const creatTask = document.getElementById('add-btn');
const formInputs = document.getElementById('form');
const addBtn = document.getElementById('add-btn');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');
let numberTasks = document.getElementById('number-tasks');
const errorDialog = document.getElementById('message');
const closeErrorMessage = document.getElementById('btn-Close-Error');
let messageContent = document.getElementById('error-message');
const clearAllTasks = document.getElementById('clear-tasks');
const notificationContainer = document.getElementById('notification-container');
const notificationDiv = document.getElementById('notification-div');
//creatin object and id tracker to handle the nested objects
let taskObj = {};
let curId = null;
//creating function displaying numberTasks
function updateTaskNumber() {
    numberTasks.innerHTML = `Tasks: <span style='color: yellow;'>${Object.keys(taskObj).length}</span>`;
}
setInterval(() => {
    updateTaskNumber();
}, 100)
const taskObject = (title, priority, statut, date) => {
    return {
        id: `${title.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: title,
        priority: priority,
        statut: statut,
        date: date
    };
}
// Handling tasks saving on localStorage
const savtaskToLocalStorage = () => {
    try {
        localStorage.setItem('tasks', JSON.stringify(taskObj));
    } catch (error) {
    }
}
// Handling getting tasks from localStorage
const getTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        taskObj = JSON.parse(storedTasks);
        Object.keys(taskObj).forEach((id) => {
            taskDiv(taskObj[id]);
        });
    }
}

//creating random color generator
let color = '5A1CE68A23F';

function randomcol() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
//checking if task holder is emty
function checkIfTaskHolderIsEmpty() {
    if (taskHolder.children.length === 0) {
        document.getElementById('task-message').classList.remove('hidden');
    } else {
        document.getElementById('task-message').classList.add('hidden');
    }
}

// creating task div and add it to container
const taskDiv = (task) => {
    let taskEle = document.createElement('div');
    taskEle.className = 'task';
    taskEle.style.borderBottom = '1px solid';
    taskEle.style.borderColor = `${randomcol()}`;
    
    let titleEle = document.createElement('h2');
    titleEle.className = 'task-name';

    let titlediv = document.createElement('div');
    titlediv.appendChild(titleEle);
    
    let paragraph2 = document.createElement('p');
    let paragraph3 = document.createElement('p');
    paragraph3.className = 'statut';
    let paragraph4 = document.createElement('p');
    paragraph4.style.color = 'red';
    paragraph4.className = 'date';

    let paragDiv = document.createElement('div');
    paragDiv.append(paragraph2, paragraph3, paragraph4);

    let divBtn = document.createElement('div');
    let editBtn = document.createElement('button');
    let deletBtn = document.createElement('button');

    deletBtn.addEventListener('click', () => {
        deleteTask(task);
    });

    titleEle.style.backgroundColor = randomcol();
    editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
    <title>Edit task</title>
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>`;

    deletBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
    <title>Delete task</title>
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>`;

    divBtn.append(editBtn, deletBtn);

    // Getting values from taskValues
    if (task.title === '' || task.priority === '' || task.statut === '' || task.date === '') {
        errorDialog.showModal();
        messageContent.innerHTML = `Please fill in the fields`;
        return;
    }

    taskEle.id = task.id;
    titleEle.innerText = task.title;
    paragraph2.innerText = task.priority;
    paragraph3.textContent = task.statut;
    paragraph4.textContent = task.date;

    taskEle.append(titlediv, paragDiv, divBtn);
    taskHolder.appendChild(taskEle);
    closeDialog();

    if (paragraph3.innerText.trim().toLowerCase() === 'completed') {
        paragraph3.style.color = 'green';
    } else{
        paragraph3.style.color = 'white';
    }

    // Apply dark mode styles to the task if dark mode is enabled
    if (style === 'enabled') {
        taskEle.classList.add('task-style');
    } else if (style === 'disabled') {
        taskEle.classList.remove('task-style');
    }

    editBtn.addEventListener('click', () => {
        editTask(task);
        addBtn.classList.add('hidden');
        saveBtn.classList.remove('hidden');
    });
    checkIfTaskHolderIsEmpty()
};

const taskValues = () => {
    // Getting values from the inputs
    let priority = document.getElementById('priority').value.trim();
    let statut = document.getElementById('statut').value.trim();
    let title = document.getElementById('title').value.trim();
    let date = document.getElementById('date').value.trim();
    const titleRegex = /^[a-zA-Z0-9\s]+$/;
    if (!titleRegex.test(title)){
        errorDialog.showModal();
        messageContent.innerHTML = `Your title <span style='color: #ffd78c;'>${title}</span> not valid <br> Symbols not allowed`;
        if (title === '' || priority === '' || statut === '' || date === '') {
            errorDialog.showModal();
            messageContent.innerHTML = `Please fill in all the fields`;
            return;
        }
    }else {
        // Add task to the task object
        const task = taskObject(title, priority, statut, date);
        if (task.title === '' || task.priority === '' || task.statut === '' || task.date === '') {
            errorDialog.showModal();
            messageContent.innerHTML = `Please fill in all the fields`;
            return;
        }else{
            taskObj[task.id] = task;
        }
        taskDiv(task);
        savtaskToLocalStorage(); 
}
    }
    

creatTask.addEventListener('click', taskValues);
//handling edit and delet buttons
const editTask = (task) => {
    curId = task.id;
    const obj = taskObj[task.id];
    document.getElementById('title').value = obj.title;
    document.getElementById('priority').value = obj.priority;
    document.getElementById('statut').value = obj.statut;
    document.getElementById('date').value = obj.date;
    openDialog()
    document.getElementById('title-dialog').innerText ='Edit your task'
};
function saveTask() {
    const curObject = taskObj[curId];
    curObject.title = document.getElementById('title').value;
    curObject.priority = document.getElementById('priority').value;
    curObject.statut = document.getElementById('statut').value;
    curObject.date = document.getElementById('date').value;
    const updatedTask = document.getElementById(curId);
    const titleTask = updatedTask.querySelector('h2');
    const priorityTask = updatedTask.querySelector('p:nth-of-type(1)');
    const statutTask = updatedTask.querySelector('p:nth-of-type(2)');
    const dateTask = updatedTask.querySelector('p:nth-of-type(3)');
    if (curObject.title === '' || curObject.priority === '' || curObject.statut === '' || curObject.date === '') {
        errorDialog.showModal();
        messageContent.innerHTML = `please fill up the form correctly`;
        return;
    }
    titleTask.innerText = curObject.title;
    priorityTask.innerText = curObject.priority;
    statutTask.innerText = curObject.statut;
    dateTask.innerText = curObject.date;
    if (statutTask.innerText.trim().toLowerCase() === 'completed') {
        statutTask.style.color = 'green';
    }else{
        statutTask.style.color = 'white';
    }
    savtaskToLocalStorage();
    closeDialog();
}
const deleteTask = (task) => {
    curId = task.id;
    const confirmDelete = confirm(`You will delete your task "${taskObj[curId].title}"`)
    if (curId && confirmDelete) {
        delete taskObj[curId];
        document.getElementById(curId).remove();
        checkIfTaskHolderIsEmpty()
    }
    if (!curId) {
        errorDialog.showModal();
        messageContent.innerHTML = `We enable to finde item`;
    }
    savtaskToLocalStorage();
};
saveBtn.addEventListener('click', saveTask)
cancelBtn.addEventListener('click', closeDialog)
//openning and closing dialog for task add
function openDialog() {
    dialogTask.showModal();
    dialogTask.style.transform = 'scale(1)';
    document.body.style.filter = 'blur(3px)';
}
function closeDialog() {
    dialogTask.close();
    dialogTask.style.transform = 'scale(0)';
    document.body.style.filter = 'blur(0px)';
    formInputs.reset();
}
addTask.addEventListener('click', openDialog);
exitBtn.addEventListener('click', closeDialog);
//handeling priority filtering display
const catComplete = document.getElementById('complet');
const catUncomplet = document.getElementById('uncomplet');
const catInprogress = document.getElementById('in-progress');
const catAll = document.getElementById('all');
function resetDisplay() {
    document.querySelectorAll('.statut').forEach((e) => {
        const parentElement = e.parentElement.parentElement;
        parentElement.style.display = '';
    });
}
function filterTasks(status) {
    resetDisplay(); // Always reset the display before applying any filter
    if (status.toLowerCase() === 'all') {
        // If "All" is selected, do not hide any tasks, just return
        return;
    }
    // Otherwise, filter tasks based on the selected status
    document.querySelectorAll('.statut').forEach((e) => {
        const taskStatus = e.innerText.trim().toLowerCase();
        const parentElement = e.parentElement.parentElement;
        if (taskStatus !== status.toLowerCase()) {
            parentElement.style.display = 'none';
        }
    });
}
const items = document.querySelectorAll('.cat-holder > p');
items.forEach(item => {
    item.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});
// Function to update the filter element based on screen size
const filterList = () => {
    const catFlex = document.querySelector('.cat-flex');
    if (window.matchMedia('(max-width: 920px)').matches) {
        // If the screen width is 920px or less, use a select element
        catFlex.innerHTML = `                        
            <select name="filter" id="filter-tasks">
                <option disabled selected>Filter</option>
                <option id="all" value="All">All</option>
                <option id="complet" value="Completed">Completed</option>
                <option id="uncomplet" value="Uncompleted">Uncompleted</option>
                <option id="in-progress" value="In progress">In progress</option>
            </select>`;
        
        // Add event listener to the select element for filtering tasks
        const select = document.querySelector('#filter-tasks');
        select.addEventListener('change', (event) => {
            const selectedValue = event.target.value;
            filterTasks(selectedValue);
        });
    } else {
        // If the screen width is greater than 920px, use span and p elements
        catFlex.innerHTML = `                        
            <span>Filter:</span>
            <p id="all">All</p>
            <p id="complet">Completed</p>
            <p id="uncomplet">Uncompleted</p>
            <p id="in-progress">In progress</p>`;
        
        // Add event listeners to each p element for filtering tasks
        document.querySelectorAll('.cat-flex > p').forEach((item) => {
            item.addEventListener('click', () => {
                filterTasks(item.innerText);
            });
        });
    }
};
// Run the function on page load
filterList();
// Add an event listener for window resize to update the filter live
window.addEventListener('resize', filterList);
//creat date format in a container
function displayDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let formattedDate = `<p style="">Today: ${year}-${month}-${day}</p>`;
    return formattedDate;
}
document.getElementById("month").innerHTML = displayDate();
//creat live time display
function timeDisplay() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let formatTime = `<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16">
  <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z"/>
  <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1"/>
</svg></span>  <span>${hours}</span>:<span>${minutes}</span>:<span style="color:yellow;">${seconds}</span>`;
    return formatTime;
}
setInterval(() => {
    document.getElementById("time").innerHTML = timeDisplay();
}, 1000);
// Function to check if notifications are allowed
async function requestNotificationPermission() {
    if (Notification.permission === 'granted') {
        return true;
    } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }
    return false;
}

async function sendNotification(title, body) {
    const permissionGranted = await requestNotificationPermission();
    if (permissionGranted) {
        const notification = new Notification(title, { body: body });
        notification.onclick = () => window.focus();
    } else {
        errorDialog.showModal();
        messageContent.innerHTML = `Notification permission not granted <br>please grant access to recieve notification about your tasks`;  
    }
}
let notificationSent = false;
function notificationTask() {
    const nowDate = new Date();
    const formattedNowDate = `${nowDate.getFullYear()}-${(nowDate.getMonth() + 1).toString().padStart(2, '0')}-${nowDate.getDate().toString().padStart(2, '0')}`;
    let notificationsSent = 0;
    Object.keys(taskObj).forEach(taskId => {
        const obj = taskObj[taskId];
        const taskDateText = obj.date;
        if (taskDateText === formattedNowDate && obj.statut === 'Completed') {
            return;
        }
        if (taskDateText === formattedNowDate) {
                notificationContainer.innerHTML += `<p class='notification'>Your task "<span style="color:red;">${obj.title}</span>" is scheduled for today!</p>`;
                sendNotification(`Your task "${obj.title}" is scheduled for today!`);
                notificationsSent++;
                if (notificationContainer.innerHTML === '') {
                    document.getElementById('notification-number').textContent = '';
                } else {
                    document.getElementById('notification-number').textContent = notificationsSent;
                }
            return;
        }
    });
}
let clicks = 0;
document.getElementById('notification').addEventListener('click', () => {
    notificationDiv.style.display = 'block';
    clicks += 1;
    if (clicks % 2 === 0) {
        notificationDiv.style.display = 'none';
    }
})
setInterval(notificationTask, 200000)
//creating function to handle search input
function filterByTitle(title) {
    resetDisplay(); 
    const searchTitle = title.trim().toLowerCase();
    document.querySelectorAll('.task-name').forEach((e) => {
        const taskName = e.innerText.trim().toLowerCase();
        const parentElement = e.parentElement.parentElement;
        if (!taskName.includes(searchTitle)) {
            parentElement.style.display = 'none';
        } else {
            parentElement.style.display = '';
        }
    });
}
document.getElementById('search-bar').addEventListener('input', (e) => {
    filterByTitle(e.target.value);
});
closeErrorMessage.addEventListener('click', () => {
    errorDialog.close();
    messageContent.innerHTML = '';
})
//getting tasks from localStorage when dom loads
document.addEventListener('DOMContentLoaded', () => {
    getTasksFromLocalStorage();
})
clearAllTasks.addEventListener('click', () => {
    if (Object.keys(taskObj).length === 0) {
        errorDialog.showModal();
        messageContent.innerHTML = 'The task holder is empty';
    }
    const confirmMessage = confirm(`Are you sure you want to clear all tasks`);
    if (Object.keys(taskObj).length > 0 && confirmMessage) {
        localStorage.clear();
        taskHolder.innerHTML = '';
        errorDialog.showModal();
        messageContent.innerHTML = `Your tasks are all cleared!<br> Tasks cleared: ${Object.keys(taskObj).length}`;
            closeErrorMessage.addEventListener('click', () => {
            window.location.reload();
        })
    }
});