const chai = require('chai');
const expect = chai.expect;
const Recipe = require('../src/recipe.js');

describe('Recipe', () => {
  let ingredientData;
  let ingredient1;
  let ingredient2;
  let ingredient3;
  let ingredient4;
  let instruction1;
  let instruction2;
  let instruction3;
  let recipe1;

  beforeEach(() => {
    ingredientData = [
      {
        id: 20081,
        name: 'wheat flour',
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
        id: 1,
        name: 'ketchup',
        estimatedCostInCents: 1,
      },
      {
        id: 2,
        name: 'chocolate',
        estimatedCostInCents: 200,
      },
    ];

    ingredient1 = {
      id: 20081,
      quantity: {
        amount: 1.5,
        unit: 'c',
      },
    };

    ingredient2 = {
      id: 18372,
      quantity: {
        amount: 0.5,
        unit: 'tsp',
      },
    };
    ingredient3 = {
      id: 1123,
      quantity: {
        amount: 1,
        unit: 'large',
      },
    };
    ingredient4 = {
      id: 1123,
      quantity: {
        amount: 2,
        unit: 'large',
      },
    };

    instruction1 = {
      instruction: 'Gather your ingredients',
      number: 1,
    };

    instruction2 = {
      instruction: 'Pour water and flour into the bowl and stir',
      number: 2,
    };
    instruction3 = {
      instruction: 'Add Eggs, sugar, and butter and combine with flour mixture',
      number: 3,
    };

    recipe1 = new Recipe(
      1,
      'https://spoonacular.com/recipeImages/595736-556x370.jpg',
      [ingredient1, ingredient2, ingredient3, ingredient4],
      [instruction1, instruction2, instruction3],
      'Choclate Chip Cookies',
      ['dessert', 'starter', 'snack']
    );
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe class', () => {
    expect(recipe1).to.be.an.instanceof(Recipe);
  });

  it('should have an id, image, ingredients, instructions, name, and tags', () => {
    expect(recipe1.id).to.equal(1);
    expect(recipe1.image).to.equal(
      'https://spoonacular.com/recipeImages/595736-556x370.jpg'
    );
    expect(recipe1.ingredients).to.deep.equal([
      ingredient1,
      ingredient2,
      ingredient3,
      ingredient4,
    ]);

    expect(recipe1.instructions).to.deep.equal([
      instruction1,
      instruction2,
      instruction3,
    ]);
    expect(recipe1.name).to.equal('Choclate Chip Cookies');
    expect(recipe1.tags).to.deep.equal(['dessert', 'starter', 'snack']);
  });

  it('should find a list of ingredients', () => {
    const listOfIngredients = recipe1.findIngredients(ingredientData);
    expect(listOfIngredients).to.deep.equal([
      {
        id: 20081,
        name: 'wheat flour',
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
        id: 1123,
        name: 'eggs',
        estimatedCostInCents: 472,
      },
    ]);
  });

  it('should return a unique list of ingredients', () => {
    const ingredientNames = recipe1.returnIngredientNames(ingredientData);

    expect(ingredientNames).deep.equal([
      'wheat flour',
      'bicarbonate of soda',
      'eggs',
    ]);
  });

  it('should return the amount of each ingredient', () => {});

  // should return 1 amount here, account for duplicate ingredients

  it('should return the total cost of all ingredients in recipe', () => {
    const totalCost = recipe1.calculateRecipeCost(ingredientData);
    expect(totalCost).to.equal(11.96);
  });

  it('should return the instructions for the recipe', () => {
    const instructions = recipe1.returnRecipeInstructions();
    expect(instructions).to.deep.equal([
      instruction1,
      instruction2,
      instruction3,
    ]);
  });
});
