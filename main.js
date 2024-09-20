const addTask = document.getElementById('add-task');
const dialogTask = document.getElementById('input-task');
const exitBtn = document.getElementById('exit-btn');
const taskHolder = document.getElementById('task-holder');
const creatTask = document.getElementById('add-btn');
const formInputs = document.getElementById('form');
const addBtn = document.getElementById('add-btn');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');
const alertdialog = document.getElementById('alert-dialog');
const alertMessage = document.getElementById('alert');
//creatin object and id tracker to handle the nested objects
let taskObj = {};
let curId = null;
const taskObject = (title, priority, statut, date) => {
    return {
        id: `${title.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: title,
        priority: priority,
        statut: statut,
        date: date
    };
}
//creating random color generator
let color = '5A1CE68A23F';

function randomcol() {
    const hex = '#'; // Start with a #
    let newColor = ''; // Initialize an empty string to build the color
    for (let i = 0; i < 6; i++) { // Loop 6 times for a valid hex color
        const randomNum = Math.floor(Math.random() * color.length); // Generate a random index
        newColor += color[randomNum]; // Append the random character to newColor
    }
    return hex + newColor; // Return the full hex color
}

// creating task div and add it to container
const taskDiv = (task) => {
    let taskEle = document.createElement('div');
    taskEle.className = 'task';
    let titleEle = document.createElement('h2');
    let paragraph2 = document.createElement('p');
    let paragraph3 = document.createElement('p');
    paragraph3.className ='statut'
    let paragraph4 = document.createElement('p');
    let divBtn = document.createElement('div');
    let editBtn = document.createElement('button');
    let deletBtn = document.createElement('button');
    deletBtn.addEventListener('click', () => {
        deleteTask(task)
    })
    titleEle.style.backgroundColor = randomcol();
    editBtn.textContent = 'Edit';
    deletBtn.textContent = 'Delete';
    divBtn.append(editBtn, deletBtn);
    //getting values from taskValues
    if (task.title === '' || task.priority === '' || task.statut === '' || task.date === '') {
        alert('please fill up the form correctly');
        return;
    } else {
        taskEle.id = task.id;
        titleEle.innerText = task.title;
        paragraph2.innerText = task.priority;
        paragraph3.textContent = task.statut;
        paragraph4.textContent = task.date;
        taskEle.append(titleEle, paragraph2, paragraph3, paragraph4, divBtn);
        taskHolder.appendChild(taskEle);
        closeDialog();
    }
    editBtn.addEventListener('click', () => {
        editTask(task);
        addBtn.classList.add('hidden');
        saveBtn.classList.remove('hidden');
    });
};
const taskValues = () => {
    //getting values from the inputs
    let priority = document.getElementById('priority').value;
    let statut = document.getElementById('statut').value;
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    //add task to the task object
    const task = taskObject(title, priority, statut, date);
    taskObj[task.id] = task;
    taskDiv(task);
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
        alert('please fill up the form correctly')
        return;
    } else {
        titleTask.innerText = curObject.title;
        priorityTask.innerText = curObject.priority;
        statutTask.innerText = curObject.statut;
        dateTask.innerText = curObject.date;
    }
    closeDialog();
}
const deleteTask = (task) => {
    curId = task.id;
    if (curId) {
        delete taskObj[curId];
        document.getElementById(curId).remove();
    } else {
        alert('we unable to find the task')
    }
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
        e.parentElement.style.display = '';
    });
}
function filterTasks(status) {
    resetDisplay(); 
    document.querySelectorAll('.statut').forEach((e) => {
        const taskStatus = e.innerText.trim().toLowerCase();
        if (taskStatus !== status.toLowerCase()) {
            e.parentElement.style.display = 'none';
        }
    });
}

function filterNon(status) {
    document.querySelectorAll('.statut').forEach((e) => {
        const taskStatus = e.innerText.trim().toLowerCase();
        if (taskStatus !== status.toLowerCase()) {
            e.parentElement.style.display = '';
        }
    });
}
catAll.addEventListener('click', resetDisplay);
catComplete.addEventListener('click', () => filterTasks('Completed'));
catUncomplet.addEventListener('click', () => filterTasks('Uncompleted'));
catInprogress.addEventListener('click', () => filterTasks('In progress'));

