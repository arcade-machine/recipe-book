import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe-book.model';
import { Ingredient } from '../shared/ingredient.module';

import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipeService {
    recipeChanging = new Subject<Recipe[]>();
    startedEditing = new Subject<number>();

    private recipesList: Recipe[] = [
        new Recipe(
          'Keto Spinach-Artichoke Chicken',
          'Spinach artichoke dip meets baked chicken! These juicy chicken ' +
          'breasts are smothered with a cheesy spinach and artichoke topping.' +
          'It\'s the ultimate comfort food for those following a keto or low-carb' +
          ' lifestyle, and will be loved by everyone in the family regardless of diet!' +
          'Serve with a side of roasted broccoli or asparagus, or on top of cauliflower rice.',
          'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F6711878.jpg',
          [
            new Ingredient('Chicken', 1),
            new Ingredient('Rice', 20)
          ]),
        new Recipe(
          'Zucchini Boats on the Grill',
          'Delish zucchini stuffed with your favorite ingredients and finished on the hot grill. ' +
          'Great side dish or as a light meal on their own.',
          'https://images.media-allrecipes.com/userphotos/720x405/5587737.jpg',
          [
            new Ingredient('Fish', 1),
            new Ingredient('Macaroni', 20)
          ])
    ];

    constructor(private shoppinglistService: ShoppingListService) {}

    getRecipes() {
        return this.recipesList.slice();
    }

    getRecipe(id: number) {
      return this.recipesList[id];
    }

    addRecipe(recipe: Recipe) {
      this.recipesList.push(recipe);
      this.recipeChanging.next(this.recipesList.slice());
    }

    editedRecipe(index: number) {
      return this.recipesList[index];
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipesList[index] = newRecipe;
      this.recipeChanging.next(this.recipesList.slice());
    }

    deleteRecipe(index: number) {
      this.recipesList.splice(index, 1);
      this.recipeChanging.next(this.recipesList.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
      this.shoppinglistService.addIngredients(ingredients);
    }
}
