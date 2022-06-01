//----- API ------//

const URL = `https://6296541a810c00c1cb73bacd.mockapi.io/todos`;

//========= Fetch ==========//
// export const fetchTodos = () => {
//     return fetch(URL)
//         .then(resp => resp.json())
// }
        
// export const createTodo = (item) => {
//      const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body:JSON.stringify(item),
// }
//     return fetch(URL, options).then(resp => resp.json).catch(error => console.log(error));
//  }

// export const deleteTodo = (id) => {
//     return fetch(`${URL}/${id}`, {
//         method: "DELETE",
// })
// }
    
// export const updateTodo = (id, data) => {
//   return fetch(`${URL}/${id}`, {
//       method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//       body: JSON.stringify(data)
// })
// }

//========= Axios ==========//

export const fetchTodos = () => {
    return axios(URL)
        .then(({data}) => data)
}
        
export const createTodo = (newItem) => {
    return axios.post(URL, newItem)
         .then(({data}) => data)
        .catch(error => console.log(error));
 }

export const deleteTodo = (id) => {
    return axios.delete(`${URL}/${id}`)
   
}
    
export const updateTodo = (id, data) => {
    return axios.put(`${URL}/${id}`, data)
}