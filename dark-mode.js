let click = 0;
let style = localStorage.getItem('darkMode') || ''; // Get initial state from localStorage

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
        document.body.classList.add('body-style');
        document.getElementById('notification-container').style.backgroundColor = '#8a70ff';
        if (document.getElementById('search-bar')) {
            document.getElementById('search-bar').style.backgroundColor = 'rgb(139, 156, 231)';
        } else {
            console.log('not found');
        }
        
        style = 'enabled';
        localStorage.setItem('darkMode', 'enabled'); // Save dark mode enabled state
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
        document.body.classList.remove('body-style');
        document.getElementById('notification-container').style.backgroundColor = '';
        
        if (document.getElementById('search-bar')) {
            document.getElementById('search-bar').style.backgroundColor = '';
        } else {
            console.log('not found');
        }
        
        style = 'disabled';
        localStorage.setItem('darkMode', 'disabled'); // Save dark mode disabled state
    }
    
    click++;
};

document.getElementById('dark-mode-activate').addEventListener('click', darkMode);

// On page load, check the localStorage value and apply dark mode if enabled
window.onload = () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        darkMode(); // Enable dark mode automatically
    }
};
