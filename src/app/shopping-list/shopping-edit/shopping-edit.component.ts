import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.module';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @Output() shoppingItemCreated = new EventEmitter<Ingredient>();
  @ViewChild('name') shoppingItemNameInput: ElementRef;
  @ViewChild('amount') serverItemAmountInput: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onCreateShoppingItem() {
    const ingName = this.shoppingItemNameInput.nativeElement.value;
    const ingAmount = this.serverItemAmountInput.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.shoppingItemCreated.emit(newIngredient);
  }
}
