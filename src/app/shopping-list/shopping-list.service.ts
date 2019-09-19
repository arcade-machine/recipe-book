import { Ingredient } from '../shared/ingredient.module';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    ingredientsChange = new EventEmitter<Ingredient[]>();

    private ingredientList: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 3)
    ];

    getIngredients() {
        return this.ingredientList.slice();
    }

    addIngredient(ingredientData: Ingredient) {
        this.ingredientList.push(ingredientData);
        this.ingredientsChange.emit(this.ingredientList.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
      // for (let ingredient of ingredients) {
      //   this.addIngredient(ingredient);
      // }
      this.ingredientList.push(...ingredients);
      this.ingredientsChange.emit(this.ingredientList.slice());
    }
}
