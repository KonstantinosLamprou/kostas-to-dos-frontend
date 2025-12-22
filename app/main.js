

let task = document.querySelector('input');
let tasklist = document.querySelector('.list');
//der EventListener nach dem Enter gedrückt worden ist 
//e steht kurz für event, es ist ein event objekt 
// const btnremove = document.querySelector('#delete-btn');
// const activetask = document.querySelector('.active');


task.addEventListener('keydown', (e) => {
    
    if (e.key === 'Enter') {

        //neue Elemente vor den EL erschaffen! 
        const meindiv = document.createElement('div');   
        meindiv.classList.add('div-wrapper');       
        
        const neuetask = document.createElement('p'); 
        neuetask.innerText = task.value; 
        const deleteButton = document.createElement('button');
        
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = "X";


        //Das Element ist erschaffen worden - wichtig!
        //Der EventListener ist das Gehirn des Buttons, würdest du es außerhalb
        //dieser Funktion implementieren, dann gäbe es ein Problem 
        //da es noch nicht existiert
        deleteButton.addEventListener('click', function(){
            meindiv.remove();  
        });
        
        meindiv.addEventListener('click', function(){
            
            meindiv.style.background = 'red';
        });

        //Nun werden dem div was erschaffen worden ist mit Körper und GEHIRN->EL
        meindiv.appendChild(neuetask);
        meindiv.appendChild(deleteButton);
        //Und als letztes das fertige Div einfügen lassen 
        //beim enter ensteht es ja deswegen muss man das Gehirn mitimplementieren 
        tasklist.appendChild(meindiv);
        task.value = "";


    }
 

});  
const resetdiv = document.querySelector('resetdiv');

if (tasklist.innerHTML === "") {
    resetdiv.classList.toggle('active');
}
// Löscht alle tasks
const reset = document.getElementById("reset-btn");

reset.addEventListener('click', ()=>{

        
        tasklist.innerHTML = ''; 
        });


//damit der reset btn angezeigt wird 


