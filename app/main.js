

let task = document.querySelector('input');
let tasklist = document.querySelector('.list');


//der EventListener nach dem Enter gedrückt worden ist 
//e steht kurz für event, es ist ein event objekt 
task.addEventListener('keydown', (e) => {
    
    if (e.key === 'Enter') {

        //neue Elemente vor den EL erschaffen! 
        const meindiv = document.createElement('div');   
        meindiv.classList.add('div-wrapper');       
        
        const neuetask = document.createElement('p'); 
        neuetask.innerText = task.value; 
        const deleteButton = document.createElement('button');
        
        deleteButton.classList.add('delete-btn');
        deleteButton.classList.add('icon-btn');
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


        
        const spacer = document.createElement('div');
        spacer.style.width = '24px'
        meindiv.appendChild(spacer);
        //Nun werden dem div was erschaffen worden ist mit Körper und GEHIRN->EL
        
        meindiv.appendChild(neuetask);
        meindiv.appendChild(deleteButton);
        //Und als letztes das fertige Div einfügen lassen 
        //beim enter ensteht es ja deswegen muss man das Gehirn mitimplementieren 
        tasklist.appendChild(meindiv);
        task.value = "";


    }
 

}); 


// Löscht alle tasks
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





