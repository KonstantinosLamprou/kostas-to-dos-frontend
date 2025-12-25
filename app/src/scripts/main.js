

let task = document.querySelector('input');
let tasklist = document.querySelector('.list');
let tasks = []; 


//der EventListener nach dem Enter gedrückt worden ist 
//e steht kurz für event, es ist ein event objekt 

tasks.forEach(t => {
    renderTask(t)
});



function renderTask(taskText) {
    //ich muss bevor ich es dort reinlade es erstmal im Array speichern 
    //Die erstelltem Aufgaben werden hier ins Arrays Tasks Gepusht
    if (task.value.trim() !== "") { 

    const meindiv = document.createElement('div');   
    meindiv.classList.add('div-wrapper');       
    
    const neuetask = document.createElement('p'); 
    neuetask.innerText = task.value; 

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
    deleteButton.addEventListener('click', function(){
        meindiv.remove(); 

    });
    
    meindiv.addEventListener('click', function(){

        if (meindiv.style.textDecoration === 'none') {
            meindiv.style.textDecoration = 'line-through'      
            } else {
            meindiv.style.textDecoration = 'none'
        }
        
    });

    } else {
            alert("Du kannst keine Task anlegen, ohne etwas geschrieben zu haben!")
        }

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



    tasks.push(taskText); 

    saveTasksToLocalStorage('MyTasks', tasks);
}; 

//vorzeitige Speicherung der Tasks
function saveTasksToLocalStorage(key, tasks){
    localStorage.setItem(key, JSON.stringify(tasks)); 
};

function loadTaskFromLocalStorage(key) {
  const storedTask= localStorage.getItem(key);
  return storedTask ? JSON.parse(storedTask) : null; // Gibt null zurück, wenn nichts gespeichert wurde
}




task.addEventListener('keydown', (e) => {
    
    if (e.key === 'Enter') {

        //ich glaube ich sollte den Input task hier rein pushen 
        
        renderTask(task.value); 
        task.value = "";

        } 
}); 



// Löscht alle tasks
const reset = document.getElementById("reset-btn");
reset.addEventListener('click', ()=>{
        tasklist.innerHTML = '';
        //Korrekt?  
      
    });

//Schließen und Öffnen der Navbar 
const navbarToggle = document.querySelector('.navbar-toggle'); 
const navbarMenu = document.querySelector('.navbar-menu');
navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active'); 
});



