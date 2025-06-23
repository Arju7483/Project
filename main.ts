console.log("Script loaded");
interface Todo{
  id: number;
  taskName : string;
  completed: boolean;
}
let TodoList : Todo[] = [];
let deleteTargetId: number | null = null;
const message = document.getElementById("message") as HTMLParagraphElement;

const modal = document.getElementById("modal") as HTMLDivElement;
const confirmDeleteBtn = document.getElementById("confirm-delete")!;
const cancelDeleteBtn = document.getElementById("cancel-delete")!;

document.getElementById("form-id")?.addEventListener("submit", function(event) {
  event.preventDefault();
  const inputTask = (document.getElementById("input-id") as HTMLInputElement).value.trim();
  console.log("Task:", inputTask);
  //names.push(inputTask);
  
  if(inputTask){
    const newtodo: Todo = {
      id: Date.now(),
      taskName: inputTask,
      completed: false
    }
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
    const list = document.getElementById("list-id") as HTMLUListElement;
    list.innerHTML = ""; // Clear old content

    console.log("TodoList: ", TodoList);

    TodoList.forEach(todo => {
      const li = document.createElement("li");
      li.textContent = todo.taskName;
      li.classList.toggle("completed", todo.completed);
      li.dataset.id = todo.id.toString();

      // Double-click to toggle completed
      li.ondblclick = () => {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
      };

      // Create delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.onclick = (e) => {
        e.stopPropagation(); // Prevents double-click toggle
        deleteTargetId = todo.id;
        modal.classList.remove("hidden"); // Show modal
      };

      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }
const saveTodos = (): void => {
    localStorage.setItem('todos', JSON.stringify(TodoList));
}




// Modal Confirmation
confirmDeleteBtn.addEventListener("click", () => {
  if (deleteTargetId !== null) {
    TodoList = TodoList.filter(todo => todo.id !== deleteTargetId);
    // saveTodos();

    console.log(TodoList);

    //renderTodos();
    deleteTargetId = null;
    modal.classList.add("hidden");
  }
});

cancelDeleteBtn.addEventListener("click", () => {
  deleteTargetId = null;
  modal.classList.add("hidden");
});

// shows the delete confirmation modal
const promptDelete = (id: string): void => {
    deleteTargetId = id;
    deleteModal.classList.remove('hidden');
}

// hides the delete confirmation modal
const hideModal = (): void => {
    todoIdToDelete = null;
    deleteModal.classList.add('hidden');
}