import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe-book.model';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})

export class RecipeItemComponent {
  @Input() recipeItem: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();

  openDescription() {
    this.recipeSelected.emit();
  }
}
