const refs = {
    body: document.querySelector('body'),
    formEl: document.querySelector('#todo-form'),
    todoList: document.querySelector('#todo-list'),
    formBtn: document.querySelector(".formBtn"),
    loader: document.querySelector('#loader'),

}

const fetchTodos = () => { }
const createTodo = () => {}
const deleteTodo = () => {}
const updateTodo = () => {}

const URL = `https://6296541a810c00c1cb73bacd.mockapi.io/todos`;
let items = [];

const loadData = () => {
    return fetch(URL)
        .then(resp => resp.json())
        .then(data => items = data)
        .catch(error => console.log(error));
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

const showLoader = () => {
    refs.loader.classList.add("show");

}

const hideLoader = () => {
        refs.loader.classList.remove("show");

}
const createItem = (item) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(item),
}
    return fetch(URL, options).then(resp => resp.json).catch(error => console.log(error));
}

const toggleItem = (id) => {

 
}

const deleteItem = (id) => {
    return fetch(`${URL}/${id}`, {
        method: "DELETE",
    }).catch(error => console.log(error))
}

const onFormSubmit = (evt) => {
    evt.preventDefault();
    const inputValue = evt.target.elements.text.value;
    const newItem = { text: inputValue, isDone: false };
showLoader()
    createItem(newItem).then(() => {
    items.push(newItem);
    }).then(() => {
    renderList(items);
    }).then(() => {
    refs.formEl.reset();
    }).finally(() => {
        hideLoader()
    })
    
}

refs.formEl.addEventListener("submit", onFormSubmit)




const handleListClick = (evt) => {
    if (evt.target === evt.currentTarget) return;
    const parent = evt.target.closest('li');
    const { id } = parent.dataset;
    if (evt.target.nodeName === "INPUT") {
        toggleItem(id)
            .then(() => {
             items = items.map(item => item.id === id ? { ...item, isDone: !item.isDone } : item);
            })
            .then(() => renderList(items))
            .catch(error => console.log(error))
        
}
if (evt.target.nodeName === "BUTTON") {
    deleteItem(id)
        .then(() => items = items.filter(item => item.id !== id))
        .then(() => renderList(items))
        .catch(error => console.log(error))
    }
}

refs.todoList.addEventListener("click", handleListClick);
 
const loadAndRender = () => {
    showLoader();
    loadData().then(() => {
        renderList(items);
    }).catch(error => console.log(error))
    .finally(() => {
        hideLoader()
    })
       

}

loadAndRender()



   
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

//================ Сохранение данных в веб-хранилищи ===========//
// const loadData = () => {
    // try {
    //     if (localStorage.getItem("todos")) {
    //         items = JSON.parse(localStorage.getItem("todos"));
    //     }
    // }catch (error){
    //     console.log(error.message)
    //     items = [];
    // }}

    // const saveData = () => {
    // localStorage.setItem("todos", JSON.stringify(items));
// }

