import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.module';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('name') shoppingItemNameInput: ElementRef;
  @ViewChild('amount') shoppingItemAmountInput: ElementRef;

  shoppingListForm: FormGroup;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
      this.shoppingListForm = new FormGroup({
          'actions': new FormGroup({
              'name': new FormControl(null, Validators.required),
              'amount': new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
          })
      });
  }

  onSubmit(form: FormGroup) {
    console.log(form);
    const ingName = form.value.actions.name;
    const ingAmount = form.value.actions.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
