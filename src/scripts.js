

const ingredientInstances = ingredientsData.map(ingredient => {
  return new Ingredient(
    ingredient.id,
    ingredient.name,
    ingredient.estimatedCostInCents
  );
});
const ingredientRepo = new IngredientRepo(ingredientInstances);
const recipesRepo = new RecipeRepo(recipeData);
let currentRecipe;
const recipeListCard = document.querySelector('.recipe-list');
const searchBtn = document.querySelector('#searchRecipes');
const searchInput = document.querySelector('.search-bar');
const filterTagSection = document.querySelector('.recipe-tags');
const allRecipesView = document.querySelector('.all-recipes');
const singleRecipeView = document.querySelector('.single-recipe');
const singleRecipeImage = document.getElementById('singleRecipeImage');
const singleRecipeList = document.getElementById('singleRecipeList');
const pageTitleText = document.querySelector('.navigation-title');
const singleRecipeBtns = document.querySelector('.single-recipe-buttons');
const topBarNavBtns = document.querySelector('.navigation-buttons');


window.addEventListener('load', displayPageLoad);
searchBtn.addEventListener('click', handleSearchDropDown);
filterTagSection.addEventListener('click', filterRecipesByTags);
recipeListCard.addEventListener('click', handleRecipeClick);
singleRecipeBtns.addEventListener('click', handleSingleRecipeButtons);
topBarNavBtns.addEventListener('click', handleNavButtons);

function displayAllRecipeCards(allRecipeData) {
  recipeListCard.innerHTML = '';
  allRecipeData.recipes.forEach(recipe => {
    recipeListCard.innerHTML +=
      `<div class='recipe-img-container'>
    <img class='recipe-img' id="${recipe.id}" src="${recipe.image}"
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
  if (event.target.value === 'all recipes') {
    displayAllRecipeCards(recipesRepo);
  } else if (event.target.value) {
    displayAllRecipeCards({ recipes: filteredRecipes });
  }
}

function handleRecipeClick(event) {
  const recipeId = Number(event.target.closest('.recipe-img-container').children[0].id);
  currentRecipe = recipesRepo.recipes.find(recipe => recipe.id === recipeId);
  displaySingleRecipe(currentRecipe);
  displayCostOfRecipe(currentRecipe);

}
function displaySingleRecipe(recipe) {
  hideAllRecipes();
  singleRecipeImage.src = recipe.image;
  singleRecipeImage.alt = recipe.name;
  pageTitleText.innerText = recipe.name;
  displayRecipeIngredients(recipe);
}

function hideAllRecipes() {
  allRecipesView.classList.add('hidden');
  singleRecipeView.classList.remove('hidden');
}

function displayCostOfRecipe(recipe) {
  const totalCost = recipe.calculateRecipeCost(ingredientInstances);
  const costHTML = document.querySelector('.single-recipe-info-title');
  costHTML.children[1].innerText = `Recipe Cost: $${totalCost}`;
}

//Builds an object of recipe names and their ingredient amounts
function findIngredientInfo(recipe) {
  const amounts = recipe.returnIngredientAmounts()
  const ingredients = recipe.returnIngredientNames(ingredientInstances)
  // turn two arrays of strings into an array of objects with two keys holding the elements of each array
  // build one object that holds a key of "chicken"; " 1 tbs"
  const recipeInfo = {}
  ingredients.forEach((ingredient, i) => {
    recipeInfo[ingredient] = amounts[i];
  })
  return recipeInfo
}

function displayRecipeIngredients(recipe) {
  singleRecipeList.innerHTML = '';
  // This is an object that holds key value pairs of {ingredientName: amount}
  const ingredientInfo = findIngredientInfo(recipe);
  // Use destructuring to use [key, value] to then dynamically add values to the HTML
  for (let [ingredient, amount] of Object.entries(ingredientInfo)) {
    singleRecipeList.innerHTML +=
      `<li class="single-recipe-info">
    <p class="single-recipe-number">${amount}</p>
    <p class="single-recipe-ingredient">${ingredient}</p>
     </li>`
  }
  singleRecipeBtns.children[0].innerText = 'View Instructions';
}

function displayRecipeInstructions(recipe) {
  const recipeInstructions = recipe.returnRecipeInstructions();
  singleRecipeList.innerHTML = '';
  recipeInstructions.forEach(instruction => {
    singleRecipeList.innerHTML +=
      `<li class="single-recipe-info">
    <p class="single-recipe-number">${instruction.number}</p>
    <p class="single-recipe-ingredient">${instruction.instruction}</p>
     </li>`
  })
  singleRecipeBtns.children[0].innerText = 'View Ingredients';
}

function handleSingleRecipeButtons(event) {
  if (event.target.innerText === 'View Instructions') {
    displayRecipeInstructions(currentRecipe);
  } else if (event.target.innerText === 'View Ingredients') {
    displayRecipeIngredients(currentRecipe)
  }
}

function unhideHomeView() {
  allRecipesView.classList.remove('hidden');
  singleRecipeView.classList.add('hidden');
  displayAllRecipeCards(recipesRepo);
}

function handleNavButtons(event) {
  if (event.target.innerText === 'Return to Recipes') {
    unhideHomeView();
    pageTitleText.innerText = 'Whats Cookin';
  } else if (event.target.innerText === 'My Favorites') {
    displayFavoriteRecipesView();
  }
}

function displayFavoriteRecipesView() {
  allRecipesView.classList.remove('hidden');
  singleRecipeView.classList.add('hidden');
  displayAllRecipeCards({ recipes: currentUser.favoriteRecipes });
  pageTitleText.innerText = 'Favorite Recipes';
  searchInput.placeholder = 'Search Favorite Recipes';
}