const refs = {
    body: document.querySelector('body'),
    formEl: document.querySelector('#todo-form'),
    todoList: document.querySelector('#todo-list'),
  formBtn:document.querySelector(".formBtn")

}


const items = [
    { id: 1, text:"молоко", isDone:true },
    {id:2, text:"хлеб", isDone:false},
   {id:3, text:"картошка", isDone:true},
  {id:4, text:"молоко", isDone:false},

];



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
    const newItem = { id: Date.now(), text: inputValue, isDone: false };
    items.push(newItem);
    renderList(items);
    refs.formEl.reset();

    // console.log(inputValue)
}


refs.formEl.addEventListener("submit", onFormSubmit)

const createItems = ({ id, text, isDone }) =>{
   return `<li class="todo-item" data-id="${id}">
        <label>
      <input type="checkbox" ${isDone ? "checked" : ""}/>
      <span>${text}</span>
    </label>
    <button>x</button>
     </li>`};
    


const renderList = (items) => {
    const list = items.map(createItems).join("");
    refs.todoList.innerHTML = "";
  refs.todoList.insertAdjacentHTML("beforeend", list); 
}

renderList(items);

const isDoneChange = () => {

}



