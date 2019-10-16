import { Ingredient } from '../shared/ingredient.module';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientsChange = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredientList: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 3)
    ];

    getIngredients() {
        return this.ingredientList.slice();
    }

    findIngredient(index: number) {
      return this.ingredientList[index];
    }

    addIngredient(ingredientData: Ingredient) {
        this.ingredientList.push(ingredientData);
        this.ingredientsChange.next(this.ingredientList.slice());
    }

    removeIngredient(index: number) {
      this.ingredientList.splice(index, 1);
      this.ingredientsChange.next(this.ingredientList.slice());
    }

    updateIngredient(index, newIngredient: Ingredient) {
      this.ingredientList[index] = newIngredient;
      this.ingredientsChange.next(this.ingredientList.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
      // for (let ingredient of ingredients) {
      //   this.addIngredient(ingredient);
      // }
      this.ingredientList.push(...ingredients);
      this.ingredientsChange.next(this.ingredientList.slice());
    }
}
