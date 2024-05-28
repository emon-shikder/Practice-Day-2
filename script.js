document.getElementById('search-button').addEventListener('click', function() {
    const mealName = document.getElementById('search-input').value.trim();
    if (mealName) {
        searchMealsByName(mealName);
    } else {
        alert('Please enter a meal name.');
    }
});

function searchMealsByName(mealName) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.meals);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResults(meals) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (meals) {
        meals.forEach(meal => {
            const mealDiv = document.createElement('div');
            mealDiv.className = 'meal';
            mealDiv.addEventListener('click', () => showMealDetails(meal));

            const mealName = document.createElement('h2');
            mealName.textContent = meal.strMeal;
            mealDiv.appendChild(mealName);

            const mealImage = document.createElement('img');
            mealImage.src = meal.strMealThumb;
            mealImage.alt = meal.strMeal;
            mealDiv.appendChild(mealImage);

            resultsDiv.appendChild(mealDiv);
        });
    } else {
        resultsDiv.textContent = 'No meals found with this name.';
    }
}

function showMealDetails(meal) {
    const detailsDiv = document.getElementById('meal-details');
    const details = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h2>${meal.strMeal}</h2>
        <p>${meal.strInstructions}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${getIngredientsList(meal)}
        </ul>
    `;

    detailsDiv.innerHTML = details;
    detailsDiv.style.display = 'block';
    window.scrollTo({ top: detailsDiv.offsetTop - 20, behavior: 'smooth' });
}

function getIngredientsList(meal) {
    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
            ingredients += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return ingredients;
}
