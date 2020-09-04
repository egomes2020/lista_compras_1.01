//SELECT ELEMENTS
const clear = document.querySelectorAll(".clear");
const dateElement = document.querySelector('#date');
const list = document.querySelector("#list");
const input = document.getElementById("input");
const add_btn = document.getElementById("add_btn");


//EVENT LISTENER


//CLASSES NAMES
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//VARIABLES
let LIST, id;


// GET ITEM FROM LOCAL STORAGE
let data = localStorage.getItem("TODO")

// CHECK IF DATA IS NOT EMPTY
if(data){
    LIST = JSON.parse(data);
    id = LIST.length
    loadList(LIST)
}else{
    // if data is not empty
    LIST = []
    id = 0
}

// LOAD ITEMS TO USER INTERFACE
 function loadList(array){
     array.forEach(function(item){
         addToDo(item.name, item.id, item.done, item.trash)
     })
 }



//SHOW DATE
const options = {
    year: "numeric" ,
    weekday: "short", 
    month: "long", 
    day: "numeric"
}

const today = new Date()
dateElement.innerHTML = today.toLocaleDateString("br", options);

// FUNCTION ADD ITEM
function addToDo(toDo, id, done, trash) {

    if (trash){return}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : ""; 

    const item = `
                    <li class="item">
                       <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                       <p class="text ${LINE}" contenteditable="true">${toDo}</p>
                       <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                 `;

    const position = "afterbegin"
    
    list.insertAdjacentHTML(position, item)


}


// FUNCTION PRESS KEYCODE ENTER BUTTON
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13) {
        const toDo = input.value
        if(toDo){
            addToDo(toDo, id, false, false)

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            })

            // ADD ITEM TO LOCAL STORAGE (PUT THIS LINE WHERE ARRAY IS UPDATED)
            localStorage.setItem("TODO", JSON.stringify(LIST))


            id++
        }
        input.value = ""
        
    }
});

// addToDo("macarrão",1 ,true, false)

// FUNCTION COMPLETE TODO
function completeToDo(element){
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)

    LIST[element.id].done = LIST[element.id].done ? false : true
}


// FUNCTION REMOVE TODO
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode)

    LIST[element.id].trash = true
}

// FUNCTION RETURN ITENS
list.addEventListener("click", function(event){
    const element = event.target // return clicked element inside list
    const elementJob = element.attributes.job.value // complete or delete

    if(elementJob == "complete"){
        completeToDo(element)
    } else if (elementJob == "delete"){
        removeToDo(element)
    }

    // ADD ITEM TO LOCAL STORAGE (PUT THIS LINE WHERE ARRAY IS UPDATED)
    localStorage.setItem("TODO", JSON.stringify(LIST))

})