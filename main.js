const addTask = document.getElementById('add-task');
const dialogTask = document.getElementById('input-task');
const exitBtn = document.getElementById('exit-btn');
const taskHolder = document.getElementById('task-holder');
const creatTask = document.getElementById('add-btn');
const formInputs = document.getElementById('form');
let taskObj = {};
const taskObject = (title, priority, statut, date) => {
    return {
        id: `${title.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: title,
        priority: priority,
        statut: statut,
        date: date
    };
}

// creating task div and add it to container
const taskDiv = (task) => {
    let taskEle = document.createElement('div');
    taskEle.className = 'task';
    let titleEle = document.createElement('h2');
    let paragraph2 = document.createElement('p');
    let paragraph3 = document.createElement('p');
    let paragraph4 = document.createElement('p');
    let divBtn = document.createElement('div');
    let editBtn = document.createElement('button');
    let deletBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    deletBtn.textContent = 'Delete';
    divBtn.append(editBtn, deletBtn);
    //getting values from taskValues
    if (task.title === '' || task.priority === '' || task.statut ==='' || task.date ==='') {
        alert('Please fill in the form')
    } else {
        taskEle.id = task.id;
    titleEle.innerText = task.title;
    paragraph2.innerText = task.priority;
    paragraph3.textContent = task.statut;
    paragraph4.textContent = task.date;
    taskEle.append(titleEle, paragraph2, paragraph3, paragraph4, divBtn);
    taskHolder.appendChild(taskEle);
    }
};


const taskValues = () => {
    const priority = document.getElementById('priority').value;
    const statut = document.getElementById('statut').value;
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    //add task to the task object
    const task = taskObject(title, priority, statut, date);
    taskObj[task.id] = task;
    taskDiv(task);
    closeDialog();
}
creatTask.addEventListener('click', taskValues);

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
addTask.addEventListener('click', openDialog)
exitBtn.addEventListener('click', closeDialog)