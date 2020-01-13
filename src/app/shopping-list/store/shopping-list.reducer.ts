import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.module';
import { ADD_INGREDIENTS } from './shopping-list.actions';

export interface State {
  ingredientList: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredientList: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredientList: [
          ...state.ingredientList,
          action.payload
        ]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredientList: [
          ...state.ingredientList,
          ...action.payload
        ]
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredientList[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const updatedIngredients = [...state.ingredientList];
      updatedIngredients[action.payload.index] = updatedIngredient;

      return {
        ...state,
        ingredientList: updatedIngredients
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredientList: state.ingredientList.filter((ig, igIndex) => {
          return igIndex !== action.payload;
        })
      };

    default:
      return state;
  }
}
