import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.module';
import { Observable, Subscription } from 'rxjs';

import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})

export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredientList: Ingredient[] }>;
  private _ingredientsChange: Subscription;

  constructor(
    private store: Store<fromShoppingList.AppState>
  ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this._ingredientsChange = this.shoppingListService.ingredientsChange.subscribe(
    //     (ingredient: Ingredient[]) =>  {
    //       this.ingredients = ingredient;
    //     }
    // );
  }

  ngOnDestroy(): void {
    // this._ingredientsChange.unsubscribe();
  }

  onEditNumber(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    // this.shoppingListService.startedEditing.next(index);
  }
}
