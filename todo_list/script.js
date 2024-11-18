// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Add a task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;

        // Add a 'Complete' button
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.addEventListener('click', () => {
            li.style.textDecoration = 'line-through';
        });

        // Add a 'Delete' button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
        });

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';
    }
});
