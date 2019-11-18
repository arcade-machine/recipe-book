import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';


import { Ingredient } from '../../shared/ingredient.module';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingListForm: FormGroup;

  onSubscribe: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
      this.shoppingListForm = new FormGroup({
          'actions': new FormGroup({
              'name': new FormControl(null, Validators.required),
              'amount': new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
          })
      });

      this.onSubscribe = this.store.select('shoppingList').subscribe(stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.shoppingListForm.controls.actions.setValue({
            'name': this.editedItem.name,
            'amount': this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.onSubscribe.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onSubmit(form: FormGroup) {
    const ingName = form.value.actions.name;
    const ingAmount = form.value.actions.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.editMode ?
      // this.shoppingListService.updateIngredient(this.editItemIndex, newIngredient) :
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({
        index: this.editItemIndex,
        ingredient: newIngredient
      })) :
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  resetForm() {
    this.editMode = false;
    this.shoppingListForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  deleteIngredient() {
    // this.shoppingListService.removeIngredient(this.editItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editItemIndex));
    this.resetForm();
  }
}
