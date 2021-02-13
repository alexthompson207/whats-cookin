const chai = require('chai');
const User = require('../src/User');
const expect = chai.expect;
const user = require('../src/User');

describe.only('User', () => {
  let userData; 
  beforeEach(() => {
    userData = [
      {
        'name': 'Saige O\'Kon',
        'id': 1,
        'pantry': [
          {
            'ingredient': 11477,
            'amount': 4
          },
          {
            'ingredient': 11297,
            'amount': 4
          },
          {
            'ingredient': 1082047,
            'amount': 10
          },
          {
            'ingredient': 20081,
            'amount': 5
          },
          {
            'ingredient': 11215,
            'amount': 5
          }
        ]
      },
      {
        'name': 'Georgia o\'Keeffe',
        'id': 2,
        'pantry': [
          {
            'ingredient': 18371,
            'amount': 4
          },
          {
            'ingredient': 19336,
            'amount': 4
          },
          {
            'ingredient': 11215,
            'amount': 10
          },
          {
            'ingredient': 9152,
            'amount': 5
          },
          {
            'ingredient': 11297,
            'amount': 5
          }
        ]
      },
      {
        'name': 'Charlie Chapman',
        'id': 3,
        'pantry': [
          {
            'ingredient': 1001,
            'amount': 4
          },
          {
            'ingredient': 11529,
            'amount': 4
          },
          {
            'ingredient': 1082047,
            'amount': 10
          },
          {
            'ingredient': 20081,
            'amount': 5
          },
          {
            'ingredient': 2021,
            'amount': 5
          }
        ]
      },
    ]
  });
  it('should be a function', () => { 
      expect(User).to.be.a('function'); 
  });

  it('should be an instance of user', () => {
    const user = new User();
    expect(user).to.be.an.instanceof(User); 
  })

  it('should have a name, id, pantry, favorite recipes, and recipes to cook', () => {
    const saige = new User(userData[0].name, userData[0].id, userData[0].pantry);
    expect(saige.name).to.equal('Saige O\'Kon');
    expect(saige.id).to.equal(1); 
    expect(saige.pantry).to.equal([
      {
        'ingredient': 11477,
        'amount': 4
      },
      {
        'ingredient': 11297,
        'amount': 4
      },
      {
        'ingredient': 1082047,
        'amount': 10
      },
      {
        'ingredient': 20081,
        'amount': 5
      },
      {
        'ingredient': 11215,
        'amount': 5
      }
    ]); 
    expect(user.favoriteRecipes).to.equal([]); 
    expect(user.recipesToCook).to.equal([]);
  })

});
