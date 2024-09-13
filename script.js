// User data and tasks will be stored in localStorage

// Sample users
const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'employee', password: 'emp123', role: 'employee' }
];

// Initialize tasks array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Get elements
const loginSection = document.getElementById('login-section');
const adminDashboard = document.getElementById('admin-dashboard');
const employeeDashboard = document.getElementById('employee-dashboard');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const employeeTaskList = document.getElementById('employee-task-list');

// Login button click event
loginBtn.addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        loginSection.style.display = 'none';
        if (user.role === 'admin') {
            adminDashboard.style.display = 'block';
            renderTasks();
        } else {
            employeeDashboard.style.display = 'block';
            loadEmployeeTasks(user.username);
        }
    } else {
        loginError.textContent = 'Invalid credentials!';
        loginError.style.display = 'block';
    }
});

// Admin creates a new task
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskTitle = document.getElementById('task-title').value;
    const employeeName = document.getElementById('employee-name').value;
    const dueDate = document.getElementById('due-date').value;

    const newTask = {
        title: taskTitle,
        employee: employeeName,
        dueDate: dueDate
    };

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskForm.reset();
    renderTasks();
});

// Render tasks for admin
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `Task: ${task.title}, Assigned to: ${task.employee}, Due: ${task.dueDate}`;
        taskList.appendChild(li);
    });
}

// Load tasks for employees
function loadEmployeeTasks(username) {
    employeeTaskList.innerHTML = '';
    const employeeTasks = tasks.filter(task => task.employee === username);
    employeeTasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `Task: ${task.title}, Due: ${task.dueDate}`;
        employeeTaskList.appendChild(li);
    });
}
