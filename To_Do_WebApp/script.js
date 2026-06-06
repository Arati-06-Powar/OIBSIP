let pendingTasks = [];
let completedTasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    date: new Date().toLocaleString()
  };

  pendingTasks.push(task);
  taskInput.value = "";
  displayTasks();
}

function displayTasks() {
  const pendingList = document.getElementById("pendingList");
  const completedList = document.getElementById("completedList");

  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  pendingTasks.forEach(task => {
    pendingList.innerHTML += `
      <li>
        <div class="task-text">${task.text}</div>
        <div class="task-date">Added: ${task.date}</div>
        <div class="actions">
          <button class="complete-btn" onclick="completeTask(${task.id})">Complete</button>
          <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
          <button class="delete-btn" onclick="deletePendingTask(${task.id})">Delete</button>
        </div>
      </li>
    `;
  });

  completedTasks.forEach(task => {
    completedList.innerHTML += `
      <li>
        <div class="task-text">${task.text}</div>
        <div class="task-date">Completed: ${task.completedDate}</div>
        <div class="actions">
          <button class="restore-btn" onclick="restoreTask(${task.id})">Restore</button>
          <button class="delete-btn" onclick="deleteCompletedTask(${task.id})">Delete</button>
        </div>
      </li>
    `;
  });
}

function completeTask(id) {
  const task = pendingTasks.find(task => task.id === id);
  task.completedDate = new Date().toLocaleString();

  completedTasks.push(task);
  pendingTasks = pendingTasks.filter(task => task.id !== id);

  displayTasks();
}

function editTask(id) {
  const task = pendingTasks.find(task => task.id === id);
  const newText = prompt("Edit your task:", task.text);

  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    displayTasks();
  }
}

function deletePendingTask(id) {
  pendingTasks = pendingTasks.filter(task => task.id !== id);
  displayTasks();
}

function deleteCompletedTask(id) {
  completedTasks = completedTasks.filter(task => task.id !== id);
  displayTasks();
}

function restoreTask(id) {
  const task = completedTasks.find(task => task.id === id);
  delete task.completedDate;

  pendingTasks.push(task);
  completedTasks = completedTasks.filter(task => task.id !== id);

  displayTasks();
}

document.getElementById("taskInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});