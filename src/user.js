class User {
  constructor(name, id, pantry) {
    this.name = name; 
    this.id = id; 
    this.pantry = pantry; 
    this.favoriteRecipes = []; 
    this.recipesToCook = []; 
  }
}

module.exports = User; 