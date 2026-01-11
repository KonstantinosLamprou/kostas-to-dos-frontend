//TODO: Datum Funktion 
//TODO: Render der Task Funktion? Klappt das? 


export function giveDate() {
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

    return formattedDate; 
}