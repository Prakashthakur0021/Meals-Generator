const getMealBtn = document.querySelector("#gen_meal");
const mealContainer = document.querySelector(".meal");
const containerEl = document.querySelector(".container");

getMealBtn.addEventListener("click", () => {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((res) => {
      createMeal(res.meals[0]);
    });
  containerEl.style.textAlign = "left";
});

function createMeal(meal) {
  let ingredients = [];
  for (i = 1; i <= 20; i++) {
    if (`${meal[`strIngredient${i}`]}`) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  console.log(ingredients);

  console.log("chala");
  mealContainer.innerHTML = `
    <div class="row">
      <div class="col-md-6 ">
        <img src="${meal.strMealThumb}" alt="img" />
        <p class="mt-2"><strong>Category :</strong> ${meal.strCategory}</p>
        <p><strong>Area :</strong> ${meal.strArea}</p>
        <p><strong>Tags :</strong> ${meal.strTags}</p>
        <div><strong>Ingredients :</strong>
            <ul>
            ${ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join("")} 
            </ul>
        </div>
      </div>
      <div class="col-md-6">
        <h4>${meal.strMeal}</h4>
        ${meal.strInstructions}
       </div>
    </div>
    <div class="row">
        <h3 class="my-2">Video Recipe</h3>
        <div class="videoWrapper">
          <iframe 
            src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"
          ></iframe>
        </div>
      </div>
  `;
}

// width="560" height="349"
