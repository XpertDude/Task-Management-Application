const addTask = document.getElementById('add-task');
const dialogTask = document.getElementById('input-task');
const exitBtn = document.getElementById('exit-btn');
const taskHolder = document.getElementById('task-holder');
const creatTask = document.getElementById('add-btn');
const taskObj = {};
// creating task div and add it to container
const taskDiv = () => {
    let priority = document.getElementById('priority').value;
    let statut = document.getElementById('statut').value;
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    const task = `
                <div class="task">
                <h2>Title: ${title}</h2>
                <p>Priority: "${priority}"</p>
                <p>Statut: "${statut}"</p>
                <p>Date: ${date}</p>
                <div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
    `
    taskHolder.innerHTML += task;
    return;
};
creatTask.addEventListener('click', taskDiv);

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
}
addTask.addEventListener('click', openDialog)
exitBtn.addEventListener('click', closeDialog)