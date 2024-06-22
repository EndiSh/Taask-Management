// Simulated database to store tasks
const taskDatabase = [];

// Function to add a task to the database (simulated async operation)
function addTask(taskDescription) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const task = {
          description: taskDescription,
          completed: false, // Initialize as not completed
        };
        taskDatabase.push(task);
        resolve("Task added successfully");
      }, 1000);
    });
}
console.log("DB Data", taskDatabase);

// Function to mark a task as completed (simulated async operation)
function completeTask(index) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (index >= 0 && index < taskDatabase.length) {
        taskDatabase[index].completed = true;
        resolve("Task marked as completed");
        console.log("DB Data", taskDatabase);

      } else {
        reject("Invalid task index");
      }
    }, 1000);
  });
}

// Function to list all tasks (simulated async operation)
function listTasks() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(taskDatabase);
    }, 1000);
  });
}

// DOM elements
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Event listener for adding a task
addTaskButton.addEventListener("click", () => {
  const taskDescription = taskInput.value.trim();
  if (taskDescription !== "") {
    addTask(taskDescription)
      .then((message) => {
        console.log(message);
        taskInput.value = "";
        bejUpdateListen();
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

// Event listener for completing a task
taskList.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    const taskIndex = Array.from(taskList.children).indexOf(event.target);
    completeTask(taskIndex)
      .then((message) => {
        console.log(message);
        bejUpdateListen();
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

// Function to list tasks and update the UI
function bejUpdateListen() {
  listTasks()
    .then((tasks) => {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.textContent = `${task.completed ? "Done" : "Not Done"} ${task.description}`;
        taskList.appendChild(taskItem);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
