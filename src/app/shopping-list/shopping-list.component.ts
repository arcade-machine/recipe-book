import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.module';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})

export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private _ingredientsChange: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this._ingredientsChange = this.shoppingListService.ingredientsChange.subscribe(
        (ingredient: Ingredient[]) =>  {
          this.ingredients = ingredient;
        }
    );
  }

  ngOnDestroy(): void {
    this._ingredientsChange.unsubscribe();
  }

}
