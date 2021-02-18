const chai = require('chai');
const expect = chai.expect;
const RecipeRepo = require('../src/RecipeRepo');
const Recipe = require('../src/Recipe');
const IngredientRepo = require('../src/IngredientRepo');
const Ingredient = require('../src/Ingredient');

describe('RecipeRepo', () => {
  let defaultRecipeList, recipeList, recipeData, recipeInstances, 
    buffaloChicken, beefNoodle, spaghetti, ingredientData, 
    ingredientList, ingredientRepo;

  beforeEach(() => {
    defaultRecipeList = new RecipeRepo();
    buffaloChicken = {
      id: 991136,
      image: 'https://spoonacular.com/recipeImages/991136-556x370.jpg',
      ingredients: [
        {
          id: 1001,
          quantity: {
            amount: 0.25,
            unit: 'cup',
          },
        },
        {
          id: 98871,
          quantity: {
            amount: 12,
            unit: 'unit',
          },
        },
      ],
      instructions: [
        { instruction: 'step 1', number: 1 },
        { instruction: 'step 2', number: 2 },
        { instruction: 'step 3', number: 3 },
      ],
      name: 'Buffalo Chicken Example',
      tags: ['lunch', 'main course', 'main dish', 'dinner'],
    };
    beefNoodle = {
      id: 2,
      image: 'https://spoonacular.com/recipeImages/595736-556x370.jpg',
      ingredients: [
        {
          id: 302,
          quantity: {
            amount: 10,
            unit: 'cup',
          },
        },
        {
          id: 410,
          quantity: {
            amount: 3,
            unit: 'tbs',
          },
        },
      ],
      instructions: [
        { instruction: 'step 1', number: 1 },
        { instruction: 'step 2', number: 2 },
        { instruction: 'step 3', number: 3 },
      ],
      name: 'Beef Noodle',
      tags: ['noodles', 'main dish', 'hot dish'],
    };
    spaghetti = {
      id: 1234,
      image: 'https://spoonacular.com/recipeImages/991136-556x370.jpg',
      ingredients: [
        {
          id: 1001,
          quantity: {
            amount: 0.25,
            unit: 'cup',
          },
        },
        {
          id: 91,
          quantity: {
            amount: 12,
            unit: 'unit',
          },
        },
        {
          id: 1001,
          quantity: {
            amount: 4,
            unit: 'unit',
          },
        },
      ],
      instructions: [
        { instruction: 'step 1', number: 1 },
        { instruction: 'step 2', number: 2 },
        { instruction: 'step 3', number: 3 },
      ],
      name: 'Spaghetti',
      tags: ['lunch', 'main course', 'main dish', 'dinner'],
    };
    ingredientData = [
      {
        id: 98871,
        name: 'hawaiian sweet rolls',
        estimatedCostInCents: 142,
      },
      {
        id: 18372,
        name: 'bicarbonate of soda',
        estimatedCostInCents: 582,
      },
      {
        id: 1123,
        name: 'eggs',
        estimatedCostInCents: 472,
      },
      {
        id: 1001,
        name: 'butter',
        estimatedCostInCents: 1,
      },
      {
        id: 2,
        name: 'chocolate',
        estimatedCostInCents: 200,
      },
    ];
    ingredientList = ingredientData.map(ingredient => {
      return new Ingredient(
        ingredient.id,
        ingredient.name,
        ingredient.estimatedCostInCents
      );
    });
    ingredientRepo = new IngredientRepo(ingredientList);
    recipeData = [buffaloChicken, beefNoodle, spaghetti];
    recipeInstances = recipeData.map(recipe => {
      return new Recipe(
        recipe.id,
        recipe.image,
        recipe.ingredients,
        recipe.instructions,
        recipe.name,
        recipe.tags
      );
    });

    recipeList = new RecipeRepo(recipeInstances);
  });

  describe('Properties', () => {
    it('should be a function', () => {
      expect(RecipeRepo).to.be.a('function');
    });

    it('should be an instance of RecipeRepo', () => {
      expect(defaultRecipeList).to.be.an.instanceof(RecipeRepo);
    });

    it('should have no recipe(s) by default', () => {
      expect(defaultRecipeList.recipes).to.deep.equal([]);
    });

    it('should be able to hold a recipe if passed in', () => {
      defaultRecipeList = new RecipeRepo([buffaloChicken]);
      expect(defaultRecipeList.recipes).to.deep.equal([buffaloChicken]);
    });

    it('should be able to hold mutiple recipes', () => {
      defaultRecipeList = new RecipeRepo([buffaloChicken, beefNoodle]);
      expect(defaultRecipeList.recipes).to.deep.equal([buffaloChicken, beefNoodle]);
    });

    it('should create a Recipe instance from a recipe passed in', () => {
      expect(recipeList.recipes[0]).to.be.an.instanceof(Recipe);
      expect(recipeList.recipes[1]).to.be.an.instanceof(Recipe);
    });
  });

  describe('Methods', () => {
    it('should be able to filter recipes by a tag', () => {
      const result = recipeList.filterRecipesByTag('noodles');

      expect(result).deep.equal([beefNoodle]);
    });

    it('should be able to return multiple recipes if they share the same tag', () => {
      const result = recipeList.filterRecipesByTag('dinner');

      expect(result).deep.equal([buffaloChicken, spaghetti]);
    });

    it("should return an empty array if tag isn't found", () => {
      const result = recipeList.filterRecipesByTag('snack');

      expect(result).deep.equal([]);
    });

    it('should be able to filter recipes by a name', () => {
      const result = recipeList.filterRecipesByName('Beef Noodle');

      expect(result).deep.equal(beefNoodle);
    });

    it('should be able to filter recipes by a name if not capitalized correctly', () => {
      const result = recipeList.filterRecipesByName('beef noodle');

      expect(result).deep.equal(beefNoodle);
    });

    it("should return undefined if the recipe doesn't exist", () => {
      const result = recipeList.filterRecipesByName('Pork Tacos');

      expect(result).deep.equal(undefined);
    });

    it('should be able to filter recipes by an ingredient', () => {
      const result = recipeList.filterRecipesByIngredients(ingredientRepo, 'hawaiian sweet rolls');

      expect(result).deep.equal([buffaloChicken]);
    });

    it('should be able return all recipes that include an ingredient', () => {
      const result = recipeList.filterRecipesByIngredients(ingredientRepo, 'butter');

      expect(result).deep.equal([buffaloChicken, spaghetti]);
    });

    it('should not return duplicate recipes', () => {
      const result = recipeList.filterRecipesByIngredients(ingredientRepo, 'butter');

      expect(result).deep.equal([buffaloChicken, spaghetti]);
    });

    it('should return an empty array if no ingredients are in a recipe', () => {
      const result = recipeList.filterRecipesByIngredients(ingredientRepo, 'paprika');

      expect(result).deep.equal([]);
    });
  });
});
