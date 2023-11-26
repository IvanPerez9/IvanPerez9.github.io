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
      lunchInput.value = savedMeals[`${day}-Lunch`] || "";
      dinnerInput.value = savedMeals[`${day}-Dinner`] || "";

      dayDiv.appendChild(dayLabel);
      dayDiv.appendChild(lunchInput);
      dayDiv.appendChild(dinnerInput);

      daysContainer.appendChild(dayDiv);
  });

  function createMealInput(mealType, day) {
      const mealInput = document.createElement("input");
      mealInput.classList.add("meal-input");
      mealInput.placeholder = `Ingresa ${mealType.toLowerCase()} para ${day}`;

      // Cargar comidas guardadas si están disponibles
      mealInput.value = savedMeals[`${day}-${mealType}`] || "";

      // Event listener para la entrada manual
      mealInput.addEventListener("input", function() {
          // Guardar la comida ingresada en el almacenamiento local
          savedMeals[`${day}-${mealType}`] = mealInput.value;
          localStorage.setItem("weeklyMeals", JSON.stringify(savedMeals));
      });

      // Event listener para elementos arrastrados
      mealInput.addEventListener("drop", function(event) {
          event.preventDefault();
          const draggedItemText = event.dataTransfer.getData("text/plain");
          mealInput.value = draggedItemText;

          // Guardar la comida ingresada en el almacenamiento local
          savedMeals[`${day}-${mealType}`] = mealInput.value;
          localStorage.setItem("weeklyMeals", JSON.stringify(savedMeals));
      });

      // Evitar que el campo de entrada maneje el evento de soltar por defecto
      mealInput.addEventListener("dragover", function(event) {
          event.preventDefault();
      });

      return mealInput;
  }

  // Función para manejar el evento de inicio de arrastre
  function handleDragStart(event) {
      event.dataTransfer.setData("text/plain", event.target.textContent);
  }

  // Función para manejar el evento de fin de arrastre
  function handleDragEnd(event) {
      // Agregar cualquier código de limpieza necesario aquí
  }

  // Función para manejar el evento de soltar
  function handleDrop(event) {
      event.preventDefault();
      const draggedItemText = event.dataTransfer.getData("text/plain");

      // Identificar el campo de entrada de destino
      const targetInput = document.activeElement;

      // Verificar si el elemento activo es un campo de entrada
      if (targetInput.tagName === 'INPUT' && targetInput.classList.contains('meal-input')) {
          // Establecer el valor del campo de entrada al texto arrastrado
          targetInput.value = draggedItemText;

          // Guardar la comida ingresada en el almacenamiento local
          const day = targetInput.getAttribute('data-day');
          const mealType = targetInput.getAttribute('data-meal-type');
          savedMeals[`${day}-${mealType}`] = targetInput.value;
          localStorage.setItem("weeklyMeals", JSON.stringify(savedMeals));
      }
  }

  // Agregar escuchadores de eventos para arrastrar y soltar
  mealPlanner.addEventListener("dragover", function(event) {
      event.preventDefault(); // Permitir soltar
  });

  mealPlanner.addEventListener("drop", handleDrop);

  // Botón para borrar todos los datos
  const clearDataBtn = document.getElementById("clearDataBtn");
  clearDataBtn.addEventListener("click", function() {
      localStorage.removeItem("weeklyMeals");
      // Restablecer los valores de entrada
      document.querySelectorAll(".meal-input").forEach(input => input.value = "");
  });

  // Botón para ir a otra página
  function goToOtherPage() {
      // Puedes reemplazar esto con la URL de la otra página
      window.location.href = "otrapagina.html";
  }
});
