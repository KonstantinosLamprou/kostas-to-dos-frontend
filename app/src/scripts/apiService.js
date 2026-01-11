/*
Endpunkte aus meiner Api 

POST -> wenn eine neue Task erstellt wird

PUT -> wenn die erledigt wird oder umgekehrt 

GET -> das alle Aufgaben gezeigt werden die für den Tag anstehen 

DELETE -> wenn eine Aufgabe gelöscht werden soll
! Brauch ich für den Reset Button ein neuen DELETE Endpunkt der alle Aufgaben löscht 
*/ 
export async function postData(TaskTitle, TaskDatum) {
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

export async function deleteTask(id) {
    try {
        const url = `http://localhost:5239/tasks/${id}`; 
        const response = await fetch(url, {
            method: "DELETE"
        })

        if(!response.ok){
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        } 
        console.log(`Die Task mit der ID: ${id} wurde erfolreich gelöscht`);

    } catch (error) {
        console.error("Es gab einen Fehler beim Updaten der Daten:", error);
    }

}; 

export async function updateTask(Id, isComplete) {
    try {
        const url =  `http://localhost:5239/tasks/${Id}`; 
        if(isComplete === true)
        {
            await fetch(url, {
                method: "PUT", 
                headers: 
                {"Content-Type": "application/json"}, 
                body: JSON.stringify({
                    id: Id, 
                    iscomplete: false
                })  
            })

            if(!response.ok){
                throw new Error(`HTTP-Fehler! Status: ${response.status}`); 
            } 
        } 
        else 
        {
            await fetch(url, {
                method: "PUT", 
                headers: 
                    {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: Id, 
                    iscomplete: true
                })

            })

            if(!response.ok)
            {
                throw new Error(`HTTP-Fehler! Status: ${response.status}`); 
            } 

        }
        console.log(`Die Task mit der ID: ${Id} wurde erfolreich gelöscht`);
    } catch(error){
        console.error("Es gab einen Fehler beim Updaten der Daten:", error);
    }

}

export async function getTasks() {
    try {
        const url = "http://localhost:5239/tasks";
        const response = await fetch(url, {
            method: "GET"
        })

        const tasks = await response.json(); 
        if(!response.ok){
            throw new Error(`HTTP-Fehler! Status: ${response.status}`)
        }
        console.log(tasks); 

        return tasks; 

    } catch (error) {
        console.error("Es gab einen Fehler beim Laden der Tasks:", error);
    }

}
