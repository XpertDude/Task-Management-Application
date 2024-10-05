// Dark mode function
let click = 0;
let style = '';

const darkMode = () => {
    const buttons = document.querySelectorAll('.dark-mode-enabled');
    const darkModeEnabled = click % 2 === 0;
    if (darkModeEnabled) {
        if (buttons) {
            buttons.forEach(btn => {
                btn.classList.add('button-style');  
            });
        } else {
            console.log('not found');
        }
        document.querySelectorAll('.task').forEach(task => {
            task.classList.add('nav-style');
        });
        document.querySelector('nav').classList.add('nav-style');
        document.querySelector('main').classList.add('main-style');
        document.body.classList.add('body-style');
        if (document.getElementById('search-bar')) {
            document.getElementById('search-bar').style.backgroundColor = 'rgb(139, 156, 231)';
        } else {
            console.log('not found');
        }
        style = 'added';
    } else {
        if (buttons) {
            buttons.forEach(btn => {
                btn.classList.remove('button-style'); 
            });
        } else {
            console.log('not found');
        }
        document.querySelectorAll('.task').forEach(task => {
            task.classList.remove('nav-style');
        });
        document.querySelector('nav').classList.remove('nav-style');
        document.querySelector('main').classList.remove('main-style');
        document.body.classList.remove('body-style');
        if (document.getElementById('search-bar')) {
            document.getElementById('search-bar').style.backgroundColor = '';
        } else {
            console.log('not found');
        }
        style = 'removed';
    }
    click++;
};

document.getElementById('dark-mode-activate').addEventListener('click', darkMode);