/*
Endpunkte aus meiner Api 

POST -> wenn eine neue Task erstellt wird

PUT -> wenn die erledigt wird oder umgekehrt 

GET -> das alle Aufgaben gezeigt werden die für den Tag anstehen 

DELETE -> wenn eine Aufgabe gelöscht werden soll
! Brauch ich für den Reset Button ein neuen DELETE Endpunkt der alle Aufgaben löscht 
*/ 
async function postData(TaskTitle, TaskDatum) {
  const url = "http://localhost:5239/tasks";
  try {

    const response = await fetch(url, {
          method: "POST", 
          headers: {
              "Content-Type": "application/json",
              },
           body: JSON.stringify({
                      title: TaskTitle,
                      taskdatum: TaskDatum
                })
        });

    if (!response.ok){
        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }    

    const result = await response.json();
    console.log("Erfolg:", result);
    return result;

  } catch (error) {
    console.error("Es gab einen Fehler beim Senden der Daten:", error);
  }
};

async function deleteTask(id) {
    try {
        const url = `http://localhost:5239/tasks/${id}`; 
        const response = await fetch(url, {
            method: "DELETE"
        })

        if(!response.ok){;
        } 
        console.log(`Die Task mit der ID: ${id} wurde erfolreich gelöscht`);

    } catch (error) {
        console.error("Es gab einen Fehler beim Updaten der Daten:", error);
    }

}; 

async function updateTask(Id, isComplete) {
    try {
        const url =  `http://localhost:5239/tasks/${Id}`; 
        if(isComplete === true){
            await fetch(url, {
                method: "PUT", 
                headers: 
                {"Content-Type": "application/json"}, 
                body: JSON.stringify({
                    id: Id, 
                    iscomplete: false
                })  
            })
        } else {
            await fetch(url, {
                method: "PUT", 
                headers: 
                {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: Id, 
                    iscomplete: true
                })

            })
        }
        if(!response.ok){
            throw new Error(`HTTP-Fehler! Status: ${response.status}`); 
        } 
        console.log(`Die Task mit der ID: ${Id} wurde erfolreich gelöscht`);
    } catch(error){
        console.error("Es gab einen Fehler beim Updaten der Daten:", error);
    }

}

async function getTasks() {
    try {
        const url = "http://localhost:5239/tasks";
        const response = await fetch(url, {
            method: "GET"
        })

        const tasks = await response.json(); 
        if(!response.ok){
            throw new Error(`HTTP-Fehler! Status: ${response.status}`)
        }
        console.log(tasks)

        return tasks; 

    } catch (error) {
        console.error("Es gab einen Fehler beim Laden der Tasks:", error);
    }

}



let task = document.querySelector('input');
let tasklist = document.querySelector('.list');
let date = document.getElementById('date-input');


//aktuelles Datum 
const today = new Date();
const day = today.getDate(); 
const month = today.getMonth() + 1; //Weil 0-11 deswegen +1 
const year = today.getFullYear();
//ternary operator in aktion 
const formattedDay =  day < 10 ? '0' + day : day; 
const formattedMonth = month < 10 ? '0' + month : month; 
//auf die ISO fürs Datum achten yyyy-mm-dd 
let formattedDate = `${year}-${formattedMonth}-${formattedDay}`; 
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
