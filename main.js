var _a;
console.log("Script loaded");
var TodoList = [];
var deleteTargetId = null;
var message = document.getElementById("message");
var modal = document.getElementById("modal");
var confirmDeleteBtn = document.getElementById("confirm-delete");
var cancelDeleteBtn = document.getElementById("cancel-delete");
(_a = document.getElementById("form-id")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    event.preventDefault();
    var inputTask = document.getElementById("input-id").value.trim();
    console.log("Task:", inputTask);
    //names.push(inputTask);
    if (inputTask) {
        var newtodo = {
            id: Date.now(),
            taskName: inputTask,
            completed: false
        };
        TodoList.push(newtodo);
        renderTodos();
        // const deletebutton = document.createElement("button");
        // deletebutton.textContent = "delete";
        // deletebutton.id = "delete-id";
        // list.appendChild(deletebutton);
    }
    alert("added");
});
function renderTodos() {
    var list = document.getElementById("list-id");
    list.innerHTML = ""; // Clear old content
    console.log("TodoList: ", TodoList);
    TodoList.forEach(function (todo) {
        var li = document.createElement("li");
        li.textContent = todo.taskName;
        li.classList.toggle("completed", todo.completed);
        li.dataset.id = todo.id.toString();
        // Double-click to toggle completed
        li.ondblclick = function () {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        };
        // Create delete button
        var delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.onclick = function (e) {
            e.stopPropagation(); // Prevents double-click toggle
            deleteTargetId = todo.id;
            modal.classList.remove("hidden"); // Show modal
        };
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}
var saveTodos = function () {
    localStorage.setItem('todos', JSON.stringify(TodoList));
};
// Modal Confirmation
confirmDeleteBtn.addEventListener("click", function () {
    if (deleteTargetId !== null) {
        TodoList = TodoList.filter(function (todo) { return todo.id !== deleteTargetId; });
        // saveTodos();
        console.log(TodoList);
        //renderTodos();
        deleteTargetId = null;
        modal.classList.add("hidden");
    }
});
cancelDeleteBtn.addEventListener("click", function () {
    deleteTargetId = null;
    modal.classList.add("hidden");
});
// shows the delete confirmation modal
var promptDelete = function (id) {
    deleteTargetId = id;
    deleteModal.classList.remove('hidden');
};
// hides the delete confirmation modal
var hideModal = function () {
    todoIdToDelete = null;
    deleteModal.classList.add('hidden');
};
