document.addEventListener("DOMContentLoaded", function () {
  const daysContainer = document.getElementById("days-container");
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const burgerMenu = document.getElementById("burgerMenu");

  // Load saved meals from local storage
  const savedMeals = JSON.parse(localStorage.getItem("weeklyMeals")) || {};
  // Burger menu button
  const burgerBtn = document.getElementById("burgerBtn");
  burgerBtn.addEventListener("click", toggleBurgerMenu);

  // Load elements from JSON and populate the burger menu
  fetch('assets/json/meals.json')
    .then(response => response.json())
    .then(data => {
      populateBurgerMenu(data);
    })
    .catch(error => console.error('Error fetching JSON:', error));

  function populateBurgerMenu(data) {
    // Clear previous content
    burgerMenu.innerHTML = "";

    // Create and append list items for lunch
    const lunchList = document.createElement("ul");
    const lunchItems = data.lunch || [];
    lunchItems.forEach(item => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      lunchList.appendChild(listItem);
    });

    // Create and append list items for dinner
    const dinnerList = document.createElement("ul");
    const dinnerItems = data.dinner || [];
    dinnerItems.forEach(item => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      dinnerList.appendChild(listItem);
    });

    // Append lunch and dinner lists to the burger menu
    burgerMenu.appendChild(lunchList);
    burgerMenu.appendChild(dinnerList);
  }

  function toggleBurgerMenu() {
    burgerMenu.classList.toggle("show");
  }

  daysOfWeek.forEach(day => {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");

    const dayLabel = document.createElement("div");
    dayLabel.classList.add("day-label");
    dayLabel.textContent = day;

    const lunchInput = createMealInput("Lunch", day);
    const dinnerInput = createMealInput("Dinner", day);

    // Load saved meals if available
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
    mealInput.placeholder = `Enter ${mealType.toLowerCase()} for ${day}`;
    mealInput.addEventListener("input", function () {
      // Save the entered meal to local storage
      savedMeals[`${day}-${mealType}`] = mealInput.value;
      localStorage.setItem("weeklyMeals", JSON.stringify(savedMeals));
    });
    return mealInput;
  }

  // Clear all data button
  const clearDataBtn = document.getElementById("clearDataBtn");
  clearDataBtn.addEventListener("click", function () {
    localStorage.removeItem("weeklyMeals");
    // Reset input values
    document.querySelectorAll(".meal-input").forEach(input => input.value = "");
  });

  // Go to other page button
  function goToOtherPage() {
    // You can replace this with the URL of the other page
    window.location.href = "otherpage.html";
  }
});
