// Select the Elements
const clear = document.querySelector('.clear');
const dataElement = document.getElementById('date');
const list = document.getElementById("list");
const input = document.getElementById('input');

// class name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
// set variable
let LIST=[], id=0;
// restore to-do-list from localStorage
let data = localStorage.getItem("TODO");
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadToDo(LIST);
}else{
    LIST=[];
    id=0;
}
// load items to the user's interface
function loadToDo(array){
    array.forEach(function(item){
        addToDo(item.name,item.id,item.done,item.trash);
    });
};
// add to-do function
function addToDo(toDo,id,done,trash){
    if(trash){return;};//
    const DONE = done ? CHECK : UNCHECK;// if(done){DONE=CHECK}else{DONE=UNCHECK} 
    const LINE = done ? LINE_THROUGH : "";

    const text =`<li class="item">
                    <i class="co fa ${DONE}" job="complete" id="${id}"></i>
                    <p class="text ${LINE}"> ${toDo} </p>
                    <i class="de fa fa-trash-o" job="delete" id="${id}"></i>
                </li>`;
    const position = "beforeend";

    list.insertAdjacentHTML(position,text);
};
// add an item to the list when the user enter key
document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
         const toDo = input.value;//get the value of the input
         if(toDo){ //check if the input isn't empty , empty string will return false
             addToDo(toDo,id,false,false);
             LIST.push({
                    name:toDo,
                    id:id,
                    done:false,
                    trash:false
                 });
             localStorage.setItem("TODO",JSON.stringify(LIST));
             id++;
            }
            input.value="";//  reset the value of the input
    }
});
//to-do in done
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
};

// remove a to-do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
};

list.addEventListener("click",function(event){
    const element = event.target;
    const elementJOB = event.target.attributes.job.value;//delete or complete
  
    if(elementJOB == "complete"){
         completeToDo(element);
    }else if(elementJOB == "delete"){
         removeToDo(element);
    }
    localStorage.setItem("TODO",JSON.stringify(LIST));
  });



//clear localStorage
clear.addEventListener('click',function(){
    localStorage.clear();
    location.reload();
});
//show date
const options = { weekday:'long',month:'short',day:'numeric'};
const today = new Date();
dataElement.innerHTML=today.toLocaleDateString("zh-TW",options);















