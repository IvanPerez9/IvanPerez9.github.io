document.addEventListener("DOMContentLoaded", function() {
  const daysContainer = document.getElementById("days-container");
  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const burgerMenu = document.getElementById("burgerMenu");

  // Cargar comidas guardadas desde el almacenamiento local
  const savedMeals = JSON.parse(localStorage.getItem("weeklyMeals")) || {};
  // Botón del menú hamburguesa
  const burgerBtn = document.getElementById("burgerBtn");
  burgerBtn.addEventListener("click", toggleBurgerMenu);

  function toggleBurgerMenu() {
      burgerMenu.classList.toggle("show");
  }

  // Cargar elementos desde JSON y poblar el menú hamburguesa
  fetch('assets/json/meals.json')
      .then(response => response.json())
      .then(data => {
          populateBurgerMenu(data);
      })
      .catch(error => console.error('Error al obtener JSON:', error));

  function populateBurgerMenu(data) {
      // Limpiar el contenido previo
      burgerMenu.innerHTML = "";

      // Crear y agregar elementos de la lista para el almuerzo
      const lunchList = createList(data.lunch || [], "lunch-list");
      burgerMenu.appendChild(lunchList);

      // Crear y agregar elementos de la lista para la cena
      const dinnerList = createList(data.dinner || [], "dinner-list");
      burgerMenu.appendChild(dinnerList);
  }

  function createList(items, listId) {
      const list = document.createElement("ul");
      list.id = listId;

      items.forEach(item => {
          const listItem = document.createElement("li");
          listItem.textContent = item;
          listItem.draggable = true; // Asegurarse de que sea arrastrable
          listItem.addEventListener("dragstart", handleDragStart);
          listItem.addEventListener("dragend", handleDragEnd);

          list.appendChild(listItem);
      });

      return list;
  }

  daysOfWeek.forEach(day => {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("day");

      const dayLabel = document.createElement("div");
      dayLabel.classList.add("day-label");
      dayLabel.textContent = day;

      const lunchInput = createMealInput("Comida", day);
      const dinnerInput = createMealInput("Cena", day);

      // Cargar comidas guardadas si están disponibles
      lunchInput.value = savedMeals[`${day}-Comida`] || "";
      dinnerInput.value = savedMeals[`${day}-Cena`] || "";

      dayDiv.appendChild(dayLabel);
      dayDiv.appendChild(lunchInput);
      dayDiv.appendChild(dinnerInput);

      daysContainer.appendChild(dayDiv);
  });

  function createMealInput(mealType, day) {
      const mealInput = document.createElement("input");
      mealInput.classList.add("meal-input");
      mealInput.placeholder = `Ingresa ${mealType.toLowerCase()} para ${day}`;
      mealInput.setAttribute('data-day', day);
      mealInput.setAttribute('data-meal-type', mealType);

      // Cargar comidas guardadas si están disponibles
      mealInput.value = savedMeals[`${day}-${mealType}`] || "";

      // Evento oyente para la entrada manual y los elementos arrastrados
      mealInput.addEventListener("input", function() {
          // Guardar la comida ingresada en el almacenamiento local
          savedMeals[`${day}-${mealType}`] = mealInput.value;
          localStorage.setItem("weeklyMeals", JSON.stringify(savedMeals));
      });

      // Evento oyente para manejar el evento de soltar (drop)
      mealInput.addEventListener("drop", function(event) {
          //toggleBurgerMenu();
          event.preventDefault();
          const draggedItemText = event.dataTransfer.getData("text/plain");
          mealInput.value = draggedItemText;

          // Guardar la comida ingresada en el almacenamiento local
          savedMeals[`${day}-${mealType}`] = mealInput.value;
          localStorage.setItem("weeklyMeals", JSON.stringify(savedMeals));
      });

      // Evento oyente para prevenir el comportamiento predeterminado y permitir eventos de soltar en el campo de entrada
      mealInput.addEventListener("dragover", function(event) {
          event.preventDefault();
      });

      return mealInput;
  }


  // Función para manejar el evento de inicio de arrastre
  function handleDragStart(event) {
      event.dataTransfer.setData("text/plain", event.target.textContent);
      // Delay para cerrar el menu cuando ya tengo seleccionado algo para drop
      setTimeout(function() {
          toggleBurgerMenu();
      }, 500);
  }

  // Función para manejar el evento de fin de arrastre
  function handleDragEnd(event) {
      // Agregar cualquier código de limpieza necesario aquí
  }

  // Botón para borrar todos los datos
  const clearDataBtn = document.getElementById("clearDataBtn");
  clearDataBtn.addEventListener("click", function() {
      var isConfirmed = window.confirm("¿ Seguro que quiere borrar todos los elementos ?");
      if (isConfirmed) {
          localStorage.removeItem("weeklyMeals");
          // Restablecer los valores de entrada
          document.querySelectorAll(".meal-input").forEach(input => input.value = "");
      }
  });

});