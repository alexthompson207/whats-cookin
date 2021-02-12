
const ingredientInstances = ingredientsData.map(ingredient => {
  return new Ingredient(
    ingredient.id,
    ingredient.name,
    ingredient.estimatedCostInCents
  );
});
const ingredientRepo = new IngredientRepo(ingredientInstances);
const recipeListCard = document.querySelector('.recipe-list');
const recipesRepo = new RecipeRepo(recipeData);
const searchBtn = document.querySelector('#searchRecipes');
const searchInput = document.querySelector('.search-bar');
const filterTagSection = document.querySelector('.recipe-tags');


window.addEventListener('load', displayPageLoad);
searchBtn.addEventListener('click', handleSearchDropDown);
filterTagSection.addEventListener('click', filterRecipesByTags);

function displayAllRecipeCards(allRecipeData) {
  recipeListCard.innerHTML = '';
  allRecipeData.recipes.forEach(recipe => {
    recipeListCard.innerHTML +=
      `<div class='recipe-img-container'>
    <img class='recipe-img' src="${recipe.image}"
      alt="${recipe.name}">
      <p class='recipe-name'>${recipe.name}</p>
  </div>`
  })
}

function searchByIngrients() {
  const searchResultRecipes = recipesRepo.filterRecipesByIngredients(ingredientsData, searchInput.value);
  displayAllRecipeCards({ recipes: searchResultRecipes });
}

function searchByRecipeName() {
  const searchResultName = recipesRepo.filterRecipesByName(searchInput.value);
  displayAllRecipeCards({ recipes: [searchResultName] });
}

function handleSearchDropDown(event) {
  event.preventDefault();
  let searchBy = document.getElementById('search-recipe-select').value;
  if (searchBy === 'recipe') {
    searchByRecipeName(event);
  } else if (searchBy === 'ingredient') {
    searchByIngrients(event);
  }
  searchInput.value = '';
}

function displayPageLoad() {
  displayAllRecipeCards(recipesRepo);
}


function filterRecipesByTags(event) {
  const filteredRecipes = recipesRepo.filterRecipesByTag(event.target.value);
  if (event.target.value) {
    displayAllRecipeCards({ recipes: filteredRecipes });
  }
}

