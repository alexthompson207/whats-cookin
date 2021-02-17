const chai = require('chai');
const expect = chai.expect;
const Ingredient = require('../src/Ingredient');
const IngredientRepo = require('../src/IngredientRepo');

describe('Ingredient Repo', () => {
  let ingredientList, defaultIngredientList, ingredientData, ingredientRepo;
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
    defaultIngredientList = new IngredientRepo();
    ingredientList = ingredientData.map(ingredient => {
      return new Ingredient(
        ingredient.id,
        ingredient.name,
        ingredient.estimatedCostInCents
      );
    });
    ingredientRepo = new IngredientRepo(ingredientList);
  });

  describe('Properties', () => {
    it('should be a function', () => {
      expect(IngredientRepo).to.be.a('function');
    });

    it('should create an instance of IngredientRepo', () => {
      expect(ingredientRepo).to.be.an.instanceof(IngredientRepo);
    });

    it('should have no Ingredients by default', () => {
      expect(defaultIngredientList.ingredients).to.deep.equal([]);
    });

    it('should hold a list of Ingredients', () => {
      expect(ingredientRepo.ingredients[0]).to.be.an.instanceof(Ingredient);
    });
  });

  describe('Methods', () => {
    it('should return an ingredient id', () => {
      const ingredientId = ingredientRepo.returnIngredientId('butter');
      expect(ingredientId).to.equal(1001);
    });

    it('should return false if ingredient id is not found', () => {
      const ingredientId = ingredientRepo.returnIngredientId('water');
      expect(ingredientId).to.equal(false);
    });

    it('should return an ingredient name', () => {
      const ingredientName = ingredientRepo.returnIngredientName(1001);
      expect(ingredientName).to.equal('butter');
    });

    it('should return false if ingredient name is not found', () => {
      const ingredientName = ingredientRepo.returnIngredientName(111);
      expect(ingredientName).to.equal(false);
    });
  });
});
