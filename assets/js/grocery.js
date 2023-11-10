const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")

/*
Funcion que controla el añadido a la lista
*/
function addTask(){
    // Si no he escrito nada, no hacer nada
    if(inputBox.value === ''){
        
    } else {
        // Crea el elemento de la lista
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        // Le añade una cruz para el borrado
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span)
    }

    // Limpiar la entrada despues de añadir
    inputBox.value = "";
    // Almacena lo añadido
    saveData();
}

/*
Funciona para escuchar distintos click en la app
*/
listContainer.addEventListener("click", function(e){
    // Mira si hacemos click en un LI
    // Cambiamos o quitamos el checked
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    // Si hacemos click en un SPAN
    // Borra el elemento
    } else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }

} , false);

/*
Funciona para almacenar lo escrito en sesiones
Lo guardamos en local como "data"
*/
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

/*
Funcion para ver siempre "data" cuando recargemos la web
*/
function showDataList(){
    listContainer.innerHTML = localStorage.getItem("data");
}

/*
Funcion para borrar toda la lista
*/
function clearAll (){
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }
    saveData();
}

/*
Funciona de confirmación del borrado completo
*/
function confirmClear() {
    var isConfirmed = window.confirm("¿ Seguro que quiere borrar todos los elementos ?");
  
    if (isConfirmed) {
        clearAll();
    }
}

// Llamada para recuperar siempre los datos
showDataList();