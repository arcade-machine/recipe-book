import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.module';

const initialState = {
  ingredientList: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3)
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredientList: [
          ...state.ingredientList,
          action.payload
        ]
      };

    default:
      return state;
  }
}
