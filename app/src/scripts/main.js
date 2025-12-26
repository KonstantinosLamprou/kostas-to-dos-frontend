

let task = document.querySelector('input');
let tasklist = document.querySelector('.list');
let date = document.getElementById('date-input');


const today = new Date();

const day = today.getDate(); 
const month = today.getMonth() + 1; //Weil 0-11 deswegen +1 
const year = today.getFullYear();
//ternary operator action 
const formattedDay =  day < 10 ? '0' + day : day; 
const formattedMonth = month < 10 ? '0' + month : month; 
//auf die ISO fürs Datum achten yyyy-mm-dd 
let formattedDate = `${year}-${formattedMonth}-${formattedDay}`; 
date.value = formattedDate; 
let tasks = JSON.parse(localStorage.getItem(date.value)) || [];

//der EventListener nach dem Enter gedrückt worden ist 
//e steht kurz für event, es ist ein event objekt 

tasks.forEach(t => {
    renderTask(t);
});

//EL für das Laden der To-Dos je nachdem was du für Aufgaben für den Tag hast
date.addEventListener('input', () => {
    tasklist.innerHTML = ""; 
    tasks = JSON.parse(localStorage.getItem(date.value)) || [];
    tasks.forEach(t => {
        renderTask(t);
    });
}); 





function renderTask(taskText) {
    //ich muss bevor ich es dort reinlade es erstmal im Array speichern 
    //Die erstelltem Aufgaben werden hier ins Arrays Tasks Gepusht
   
   
        const meindiv = document.createElement('div');   
        meindiv.classList.add('div-wrapper');       
        
        const neuetask = document.createElement('p'); 
        neuetask.innerText = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.classList.add('icon-btn');
        //icon für den Delete btn
        deleteButton.innerHTML = `
        
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
            </svg>

        `;
    //Das Element ist erschaffen worden - wichtig!
    //Der EventListener ist das Gehirn des Buttons, würdest du es außerhalb
    //dieser Funktion implementieren, dann gäbe es ein Problem 
    //da es noch nicht existiert
        deleteButton.addEventListener('click', function(e){
            e.stopPropagation();
            meindiv.remove();
            //sehr elegant, denn mit der filter Funktion kann man ein neues Array erstellen, ohne das gelöschte item denn:
            //item !== task.value (alle items die NICHT denselben Wert haben => True / diese werden der Variable tasks als neues array zugeordnet)
            tasks = tasks.filter(item => item !== taskText);
            //wenn es keine tasks mehr gibt, das es im localstorage auch das leere array löscht 
            if (tasks.length === 0){
                localStorage.removeItem(date.value);
            } else { 
            localStorage.setItem(date.value, JSON.stringify(tasks)); 
            }
        });
        
        meindiv.addEventListener('click', function(){

            if (meindiv.style.textDecoration === 'none') {
                meindiv.style.textDecoration = 'line-through'      
                } else {
                meindiv.style.textDecoration = 'none'
            }
            
        });
        //Platzhalter für Zentrierungen 
        const spacer = document.createElement('div');
        spacer.style.width = '24px'


        meindiv.appendChild(spacer);
        //Nun fügen wir das div ein mit Körper und GEHIRN->EL
        meindiv.appendChild(neuetask);
        meindiv.appendChild(deleteButton);
        //Und als letztes das fertige Div einfügen lassen 
        //beim enter ensteht es ja deswegen muss man das Gehirn mitimplementieren 
        tasklist.appendChild(meindiv);
    
}
//vorzeitige Speicherung der Tasks
function saveTasksToLocalStorage(key, tasks){
    localStorage.setItem(key, JSON.stringify(tasks)); 
}

task.addEventListener('keydown', (e) => {
    
    if (e.key === 'Enter' && task.value.trim() !== "") {

        //input wird hier initial eingepusht 
        tasks.push(task.value); 
        saveTasksToLocalStorage(date.value, tasks);    

        renderTask(task.value);         

        task.value = "";

    } else if (e.key === 'Enter' && task.value.trim() === "") {
        alert("Du kannst keine Task mit keinem Inhalt anlegen")
    }
}); 



// Löscht alle tasks
const reset = document.getElementById("reset-btn");
reset.addEventListener('click', ()=>{
    tasklist.innerHTML = '';
    tasks = [];
    localStorage.removeItem(date.value);
      
    });

//Schließen und Öffnen der Navbar 
const navbarToggle = document.querySelector('.navbar-toggle'); 
const navbarMenu = document.querySelector('.navbar-menu');
navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active'); 
});



