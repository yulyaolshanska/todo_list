const refs = {
    body: document.querySelector('body'),
    formEl: document.querySelector('#todo-form'),
    todoList: document.querySelector('#todo-list'),
  formBtn:document.querySelector(".formBtn")

}



let items = [];

const loadData = () => {
    try { 
    items = JSON.parse(localStorage.getItem("todos"));
console.log(items)
    } catch (error) {
        console.log(error.message)
        items = []
    }

}

const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(items));
}


const createItems = ({ id, text, isDone }) =>{
   return `<li class="todo-item" data-id="${id}">
        <label>
      <input type="checkbox" ${isDone ? "checked" : ""}/>
      <span>${text}</span>
    </label>
    <button>x</button>
     </li>`
};
    

const renderList = (items) => {
    const list = items.map(createItems).join("");
    refs.todoList.innerHTML = "";
  refs.todoList.insertAdjacentHTML("beforeend", list); 
}

    loadData();

renderList(items);

// const createForm = () => {
//     const input = document.createElement('input');
//     const formBtn = document.createElement('button');
//     const label = document.createElement('label');
//     const span = document.createElement('span');
//     span.textContent = "Enter text";
//     input.type = "text";
//     input.name = "text";
//     formBtn.type = "submit";
//     formBtn.textContent = "+Add";
//     formBtn.classList.add("formBtn")

//     label.append(span, input);
//     refs.formEl.append(label, formBtn);

// }
// createForm();

const onFormSubmit = (evt) => {
    evt.preventDefault();
    const inputValue = evt.target.elements.text.value;
    const newItem = { id: Date.now().toString(), text: inputValue, isDone: false };
    items.push(newItem);
    saveData();
// loadData()
    renderList(items);
    refs.formEl.reset();
}

refs.formEl.addEventListener("submit", onFormSubmit)


const toggleItem = (id) => {
    items = items.map(item => item.id === id? {...item, isDone: !item.isDone} : item)

}

const deleteItem = (id) => {
    items = items.filter(item => item.id !== id);
}

const handleListClick = (evt) => {
    if (evt.target === evt.currentTarget) return;
    const parent = evt.target.closest('li');
    const { id } = parent.dataset;
    // console.log(id);
    if (evt.target.nodeName === "INPUT") {
        toggleItem(id);
        saveData();
        // loadData()
        renderList(items);
}
if (evt.target.nodeName === "BUTTON") {
    deleteItem(id);
    saveData();
    // loadData()
        renderList(items);
            // console.log("del");

    }
}

refs.todoList.addEventListener("click", handleListClick);



