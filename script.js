let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");

window.onload = function () {
  loadTasks();
};

function addTask() {
  let taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task!");

  let taskObj = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  let tasks = getTasksFromStorage();
  tasks.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  loadTasks();
}

function getTasksFromStorage() {
  let tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
  taskList.innerHTML = "";
  let tasks = getTasksFromStorage();

  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-buttons">
        <button class="complete" onclick="toggleComplete(${task.id})">✔</button>
        <button class="edit" onclick="editTask(${task.id})">✎</button>
        <button class="delete" onclick="deleteTask(${task.id})">✖</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function toggleComplete(id) {
  let tasks = getTasksFromStorage();
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(id) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function editTask(id) {
  let tasks = getTasksFromStorage();
  let task = tasks.find((t) => t.id === id);
  let newText = prompt("Edit your task:", task.text);
  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}
