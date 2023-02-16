let todos = {}
const STORAGE_TODO = "STORAGE_TODO"
const todoBox = document.getElementById('todo')

//======================================================
//=====  LOCAL STORAGE =================================
//======================================================

//Check if localstorage API is available
if (typeof(Storage) !== "undefined")
    console.log("local storage available");
else 
    console.log("Oops. you data will gone after page reload");

//read localStorage on first Load
if(todoFromLocal = localStorage.getItem(STORAGE_TODO)) {
    todos = JSON.parse(todoFromLocal)
    
    for(let key in todos)
        createList(key, todos[key])
}


function syncLocalStorage(activity, item, status = false) {
    switch(activity) {
        case 'ADD':
        case 'UPDATE':
            todos[item] = status
            break;
        case 'DELETE':
            delete todos[item]
            break;
        default:
            break;    
    }

    localStorage.setItem(STORAGE_TODO, JSON.stringify(todos))
    return
}

//======================================================
//=====  TODO FUNCTIONS ================================
//======================================================
function add() {
    let newText = document.getElementById('new_text')
    createList(newText.value)
    syncLocalStorage('ADD', newText.value)    
    newText.value = ''
}

function createList(text, status = false) {

    let newTodo = `<div id="content"> 
                        <input class="content" value="${text}" readonly>
                        <button onclick="removeItem(this)" id="delete">DELETE</button> 
                  </div>`

    todoBox.insertAdjacentHTML('beforebegin', newTodo);
}

//Delete
function removeItem(el) {
    el.parentElement.remove()
    syncLocalStorage('DELETE', el.previousElementSibling.innerText.trim()) 
    return  
}
