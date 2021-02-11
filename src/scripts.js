const recipeListCard = document.querySelector('.recipe-list');
const recipesRepo = new RecipeRepo(recipeData);
const searchBtn = document.querySelector('#searchRecipes');
const searchInput = document.querySelector('.search-bar');

var option = document.getElementsByTagName("option")[0];

searchBtn.addEventListener('click', handleSearchDropDown)

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
  // event.preventDefault();
  const searchResultRecipes = recipesRepo.filterRecipesByIngredients(ingredientsData, searchInput.value);
  console.log(searchResultRecipes);
  displayAllRecipeCards({ recipes: searchResultRecipes });
}

function searchByRecipeName() {
  // event.preventDefault();
  const searchResultName = recipesRepo.filterRecipesByName(searchInput.value);
  console.log(searchResultName);
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
}

