let currentUser = "";
let editIndex = -1;


// Login
function login() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    if (username === "admin" && password === "1234") {

        currentUser = username;

        document
            .getElementById("loginPage")
            .classList.add("hidden");

        document
            .getElementById("appPage")
            .classList.remove("hidden");

        document
            .getElementById("userDisplay")
            .innerText = username;

        loadTasks();

    } else {

        alert("Invalid username or password");

    }
}


// Logout
function logout() {

    currentUser = "";

    document
        .getElementById("appPage")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");
}


// Get tasks from LocalStorage
function getTasks() {

    return JSON.parse(
        localStorage.getItem("tasks") || "[]"
    );

}


// Save Task
function saveTask() {

    const title =
        document.getElementById("taskTitle").value;

    const description =
        document.getElementById("taskDescription").value;

    const status =
        document.getElementById("taskStatus").value;

    const date =
        document.getElementById("taskDate").value;


    if (title.trim() === "") {

        alert("Please enter task title");

        return;
    }


    let tasks = getTasks();


    const task = {
        title: title,
        description: description,
        status: status,
        date: date,
        user: currentUser
    };


    if (editIndex === -1) {

        tasks.push(task);

    } else {

        tasks[editIndex] = task;

        editIndex = -1;
    }


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    clearForm();

    loadTasks();
}


// Load Tasks
function loadTasks() {

    const tasks = getTasks();

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";


    const userTasks = tasks.filter(
        task => task.user === currentUser
    );


    if (userTasks.length === 0) {

        taskList.innerHTML =
            "<p>No tasks available.</p>";

        return;
    }


    userTasks.forEach(task => {

        const actualIndex =
            tasks.indexOf(task);


        const div =
            document.createElement("div");


        div.className =
            "task " +
            (task.status === "Completed"
                ? "completed"
                : "");


        div.innerHTML = `

            <h3>${task.title}</h3>

            <p>
                ${task.description}
            </p>

            <p>
                <b>Status:</b>
                <span class="status">
                    ${task.status}
                </span>
            </p>

            <p>
                <b>Due Date:</b>
                ${task.date || "Not specified"}
            </p>

            <button
                class="edit-btn"
                onclick="editTask(${actualIndex})">
                Edit
            </button>

            <button
                class="complete-btn"
                onclick="completeTask(${actualIndex})">
                Complete
            </button>

            <button
                class="delete-btn"
                onclick="deleteTask(${actualIndex})">
                Delete
            </button>
        `;


        taskList.appendChild(div);

    });
}


// Edit Task
function editTask(index) {

    const tasks = getTasks();

    const task = tasks[index];


    document.getElementById("taskTitle").value =
        task.title;

    document.getElementById("taskDescription").value =
        task.description;

    document.getElementById("taskStatus").value =
        task.status;

    document.getElementById("taskDate").value =
        task.date;


    editIndex = index;


    document.getElementById("formTitle")
        .innerText = "Update Task";
}


// Complete Task
function completeTask(index) {

    const tasks = getTasks();

    tasks[index].status = "Completed";


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    loadTasks();
}


// Delete Task
function deleteTask(index) {

    if (
        confirm(
            "Are you sure you want to delete this task?"
        )
    ) {

        const tasks = getTasks();

        tasks.splice(index, 1);


        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );


        loadTasks();
    }
}


// Clear Form
function clearForm() {

    document.getElementById("taskTitle").value = "";

    document.getElementById("taskDescription").value = "";

    document.getElementById("taskStatus").value =
        "Pending";

    document.getElementById("taskDate").value = "";

    editIndex = -1;


    document.getElementById("formTitle")
        .innerText = "Add New Task";
}