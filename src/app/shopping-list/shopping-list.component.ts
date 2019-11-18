import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingAction from './store/shopping-list.actions';

import { Ingredient } from '../shared/ingredient.module';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})

export class ShoppingListComponent implements OnInit {
  ingredientList: Observable<{ingredientList: Ingredient[]}>;
  private _ingredientsChange: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) { }

  ngOnInit() {
    this.ingredientList = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this._ingredientsChange = this.shoppingListService.ingredientsChange.subscribe(
    //     (ingredient: Ingredient[]) =>  {
    //       this.ingredients = ingredient;
    //     }
    // );
  }

  // ngOnDestroy(): void {
  //   this._ingredientsChange.unsubscribe();
  // }

  onEditNumber(index: number) {
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingAction.StartEdit(index));
  }
}
