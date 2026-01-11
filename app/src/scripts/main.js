import { postData } from './apiService.js'; 
import { getTasks } from './apiService.js'; 
import { updateTask } from './apiService.js'; 
import { deleteTask } from './apiService.js'; 

import { giveDate } from './utils.js';



let task = document.querySelector('input');
let tasklist = document.querySelector('.list');
let date = document.getElementById('date-input');


//Datum von Heute
let formattedDate = giveDate(); 
date.value = formattedDate; 


function renderTask(taskText, tasks) {
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

//der EventListener nach dem Enter gedrückt worden ist 
//e steht kurz für event, es ist ein event objekt 

//das kann als die main funktion betrachtet werden: 
task.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && task.value.trim() !== "") {
        
          

                
        //speichern in datenbank
        postData(task.value, date.value); 
        const tasks = getTasks(); 
        renderTask(task.value, tasks); 
        task.value = "";
    } else if (e.key === 'Enter' && task.value.trim() === "") {
        alert("Du kannst keine Task mit keinem Inhalt anlegen")
    }
});
// Löscht alle tasks /reset 
const reset = document.getElementById("reset-btn");
reset.addEventListener('click', ()=>{
    tasklist.innerHTML = '';

});

//Schließen und Öffnen der Navbar 
const navbarToggle = document.querySelector('.navbar-toggle'); 
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active'); 
});
