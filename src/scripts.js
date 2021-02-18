const ingredientInstances = ingredientsData.map(ingredient => {
  return new Ingredient(
    ingredient.id,
    ingredient.name,
    ingredient.estimatedCostInCents
  );
});

const recipeInstances = recipeData.map(recipe => {
  return new Recipe(
    recipe.id,
    recipe.image,
    recipe.ingredients,
    recipe.instructions,
    recipe.name,
    recipe.tags
  );
});

const ingredientRepo = new IngredientRepo(ingredientInstances);
const recipesRepo = new RecipeRepo(recipeInstances);
let currentRecipe;
let currentUser;

const recipeListCard = document.getElementById('recipeList');
const searchBtn = document.getElementById('searchRecipes');
const searchInput = document.getElementById('searchBar');
const filterTagSection = document.getElementById('recipeTags');
const allRecipesView = document.getElementById('allRecipes');
const singleRecipeView = document.getElementById('singleRecipeView');
const singleRecipeImage = document.getElementById('singleRecipeImage');
const singleRecipeList = document.getElementById('singleRecipeList');
const pageTitleText = document.getElementById('navTitle');
const singleRecipeBtns = document.getElementById('singleRecipeBtns');
const topBarNavBtns = document.getElementById('navBtns');
const pantryView = document.getElementById('pantryView');
const pantryList = document.getElementById('pantryList');
const pantryCookList = document.getElementById('pantryCookList');
const cookThisBtn = document.getElementById('cookThisBtn');
const pantryMessage = document.getElementById('pantryMessage');
const pantryMissingIngredientList = document.getElementById("missingIngredientsList");

window.addEventListener('load', displayPageLoad);
searchBtn.addEventListener('click', handleSearchDropDown);
filterTagSection.addEventListener('click', filterRecipesByTags);
recipeListCard.addEventListener('click', handleRecipeClick);
singleRecipeBtns.addEventListener('click', handleSingleRecipeButtons);
topBarNavBtns.addEventListener('click', handleNavButtons);
cookThisBtn.addEventListener('click', handleCookThisButton);

function displayPageLoad() {
  displayAllRecipeCards(recipesRepo);
  createNewUser();
}

function getRandomIndex(dataSet) {
  return dataSet[Math.floor(Math.random() * dataSet.length)]
}

function createNewUser() {
  const randomUser = getRandomIndex(usersData);
  currentUser = new User(randomUser.name, randomUser.id, randomUser.pantry);
  const newPantry = new Pantry(currentUser.pantry);
  currentUser.pantry = newPantry;
}

function displayTitle(title) {
  if (title === "My Favorites" || title === "Whats Cookin" || title === "My Pantry") {
    pageTitleText.innerText = title;
    pageTitleText.classList.remove("single-recipe-title");
  } else {
    pageTitleText.innerText = title;
    pageTitleText.classList.add("single-recipe-title");
  }
}

function unhideHomeView() {
  allRecipesView.classList.remove('hidden');
  singleRecipeView.classList.add('hidden');
  displayAllRecipeCards(recipesRepo);
  displayTitle("Whats Cookin");
  searchInput.placeholder = 'Search Recipes Here';
}

function hideAllRecipes() {
  allRecipesView.classList.add('hidden');
  singleRecipeView.classList.remove('hidden');
}

function displayAllRecipeCards(recipesRepo) {
  recipeListCard.innerHTML = '';
  recipesRepo.recipes.forEach(recipe => {
    recipeListCard.innerHTML +=
      `<div class='recipe-img-container'>
    <img class='recipe-img' id="${recipe.id}" src="${recipe.image}"
      alt="${recipe.name}">
      <p class='recipe-name'>${recipe.name}</p>
  </div>`
  })
}

function handleNavButtons(event) {
  switch(true) {
  case event.target.innerText === 'Return to Recipes':
    unhideHomeView();
    break; 
  case event.target.innerText === 'My Favorites':
    displayFavoriteRecipesView();
    break; 
  case event.target.innerText === 'My Pantry':
    displayPantryView();
    break; 
  }
}

function displayFavoriteRecipesView() {
  allRecipesView.classList.remove('hidden');
  pantryView.classList.add('hidden');
  singleRecipeView.classList.add('hidden');
  displayFavoriteRecipeCards({ recipes: currentUser.favoriteRecipes });
  displayTitle("My Favorites");
  searchInput.placeholder = 'Search Favorite Recipes';
}

function displayPantryView() {
  allRecipesView.classList.add('hidden');
  singleRecipeView.classList.add('hidden');
  pantryView.classList.remove('hidden');
  displayUserPantry();
  displayTitle("My Pantry");
}

function addIngredientNames() {
  currentUser.pantry.pantry.map(ingredient => {
    return ingredient.name =
      ingredientRepo.returnIngredientName(ingredient.ingredient)
  });
}

function displayUserPantry() {
  addIngredientNames();
  pantryList.innerHTML = '';
  currentUser.pantry.pantry.forEach(ingredient => {
    pantryList.innerHTML +=
      `<li class="single-recipe-info">
    <p class="single-recipe-number">${ingredient.amount}</p>
    <p class="single-recipe-ingredient">${ingredient.name}</p>
     </li>`
  })
}

function handleSearchDropDown(event) {
  event.preventDefault();
  let searchBy = document.getElementById('search-recipe-select').value;
  switch(true) {
  case searchBy === 'recipe' && pageTitleText.innerText === 'Whats Cookin':
    searchByRecipeName();
    break; 
  case searchBy === 'ingredient' && pageTitleText.innerText === 'Whats Cookin':
    searchByIngredients();
    break; 
  case searchBy === 'recipe' && pageTitleText.innerText === 'My Favorites':
    searchFavoriteRecipesByName();
    break; 
  case searchBy === 'ingredient' && pageTitleText.innerText === 'My Favorites':
    searchFavoriteRecipesByIngredient();
    break; 
  }
 searchInput.value = '';
}

function filterRecipesByTags(event) {
  const filteredRecipes = recipesRepo.filterRecipesByTag(event.target.value);
  const filteredFavoriteRecipes = currentUser.filterFavoritesByTag(event.target.value);
  switch(true) { 
  case event.target.value === 'all recipes' && pageTitleText.innerText === 'Whats Cookin':
    displayAllRecipeCards(recipesRepo);
    break; 
  case pageTitleText.innerText === 'Whats Cookin':
    displayAllRecipeCards({ recipes: filteredRecipes });
    break; 
  case event.target.value === 'all recipes' && pageTitleText.innerText === 'My Favorites':
    displayAllRecipeCards({ recipes: currentUser.favoriteRecipes });
    break; 
  case pageTitleText.innerText === 'My Favorites':
    displayAllRecipeCards({ recipes: filteredFavoriteRecipes });
    break; 
  }
}

function searchByIngredients() {
  const searchResultRecipes = recipesRepo.filterRecipesByIngredients(ingredientRepo, searchInput.value);
  displayAllRecipeCards({ recipes: searchResultRecipes });
}

function searchByRecipeName() {
  const searchResultName = recipesRepo.filterRecipesByName(searchInput.value);
  displayAllRecipeCards({ recipes: [searchResultName] });
}

function searchFavoriteRecipesByName() {
  const searchResultName = currentUser.filterFavoritesByName(searchInput.value);
  displayAllRecipeCards({ recipes: [searchResultName] });
}

function searchFavoriteRecipesByIngredient() {
  const searchResultRecipes = currentUser.filterFavoritesByIngredients(ingredientRepo, searchInput.value);
  console.log(searchResultRecipes);
  displayAllRecipeCards({ recipes: searchResultRecipes });
}

function handleRecipeClick(event) {
  const recipeId = Number(event.target.id);
  currentRecipe = recipesRepo.recipes.find(recipe => recipe.id === recipeId); 
  if (event.target.matches('img.recipe-img')) {
    displaySingleRecipe(currentRecipe);
    displayCostOfRecipe(currentRecipe);
  } else if (event.target.matches('svg.remove-icon')) {
    removeFavoriteRecipe(recipeId);
    event.target.parentNode.parentNode.removeChild(event.target.parentNode)
  }
}

function displaySingleRecipe(recipe) {
  console.log(recipe); 
  hideAllRecipes();
  singleRecipeImage.src = recipe.image;
  singleRecipeImage.alt = recipe.name;
  displayTitle(recipe.name);
  displayRecipeIngredients(recipe);
}

function displayCostOfRecipe(recipe) {
  const totalCost = recipe.calculateRecipeCost(ingredientInstances);
  const costHTML = document.querySelector('.single-recipe-info-title');
  costHTML.children[1].innerText = `Recipe Cost: $${totalCost}`;
}

function findIngredientInfo(recipe) {
  const amounts = recipe.returnIngredientAmounts();
  const ingredients = recipe.returnIngredientNames(ingredientInstances);
  const recipeInfo = {};
  ingredients.forEach((ingredient, i) => {
    recipeInfo[ingredient] = amounts[i];
  })
  return recipeInfo
}

function displayRecipeIngredients(recipe) {
  singleRecipeList.innerHTML = '';
  const ingredientInfo = findIngredientInfo(recipe);
  for (let [ingredient, amount] of Object.entries(ingredientInfo)) {
    singleRecipeList.innerHTML +=
      `<li class="single-recipe-info">
    <p class="single-recipe-number">${amount}</p>
    <p class="single-recipe-ingredient">${ingredient}</p>
     </li>`
  }
  singleRecipeBtns.children[0].innerText = 'View Instructions';
}

function handleSingleRecipeButtons(event) {
  switch(true) {
    case event.target.innerText === 'View Instructions':
      displayRecipeInstructions(currentRecipe);
      break; 
    case event.target.innerText === 'Add To Favorites':
      addRecipeToFavorites(currentRecipe);
      break; 
    case event.target.innerText === 'View Ingredients': 
      displayRecipeIngredients(currentRecipe);
      break;
    case event.target.innerText === 'Add To Cook':
      displayRecipeToCook();
      break; 
  }
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

function addRecipeToFavorites(newRecipe) {
  currentUser.addFavoriteRecipe(newRecipe);
}

function removeFavoriteRecipe(id) {
  currentUser.removeFavoriteRecipe(id);
}

function displayFavoriteRecipeCards(favoriteRecipes) {
  recipeListCard.innerHTML = '';
  favoriteRecipes.recipes.forEach(recipe => {
    recipeListCard.innerHTML +=
      `<div class='recipe-img-container'>
      <svg class="remove-icon" id="removeIcon" xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close Circle</title><path d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M320 320L192 192M192 320l128-128'/></svg>
    <img class='recipe-img favorite-recipe-img' id="${recipe.id}" src="${recipe.image}"
      alt="${recipe.name}">
      <p class='recipe-name'>${recipe.name}</p>
  </div>`
  })
}

function displayRecipeToCook() {
  currentUser.addToCookList(currentRecipe);
  pantryCookList.innerHTML = '';
  currentUser.recipesToCook.forEach(recipe => {
    pantryCookList.innerHTML += ` <li class="pantry-cook-item">
    <input class ="pantry-btn" type="radio" id="cook${recipe.id}" name="cook-recipe" value="${recipe.name}" />
    <label class="pantry-cook-item-label" for="${recipe.name}">${recipe.name}</label>
    </li>`
  });
}

function handleCookThisButton() {
  let recipeSelection;
  const cookList = document.querySelectorAll(".pantry-btn")
  cookList.forEach(recipe => {
    if (recipe.checked) {
      recipeSelection = recipesRepo.filterRecipesByName(recipe.value);
      evaluatePantry(recipeSelection);
    } else {
      pantryMessage.innerText = "Please select a meal to cook..."
    }
  })
}

function evaluatePantry(recipe) {
  const missingIngredients = currentUser.pantry.searchPantry(recipe);
  if (missingIngredients.length === 0) {
    currentUser.pantry.updatePantry(recipe);
    displayUserPantry();
    pantryMessage.innerText = "Recipe cooked! Your pantry has been updated."
  } else {
    const ingredientsNeeded = currentUser.pantry.calculateMissingIngredients(missingIngredients);
    ingredientsNeeded.map(ingredient => {
      return ingredient.name = ingredientRepo.returnIngredientName(ingredient.id);
    });
    displayMissingIngredients(recipe.name, ingredientsNeeded);
  }
}

function displayMissingIngredients(recipe, ingredients) {
  pantryMessage.innerText = `You don't have enough ingredients to cook ${recipe}...Here's a list of what you'll need:`
  pantryMissingIngredientList.innerHTML = '';
  ingredients.forEach(ingredient => {
    pantryMissingIngredientList.innerHTML += ` <li class="pantry-missing-item">
    <p class="pantry-missing-ingredient">${ingredient.name}</p>
    <p class="pantry-missing-amount">${ingredient.amount}</p>
    <p class="pantry-missing-unit">${ingredient.unit}</p>
  </li>`
  })
}

