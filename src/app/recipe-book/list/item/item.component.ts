import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe-book.model';
import { RecipeService } from '../../recipe.service';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})

export class RecipeItemComponent {
  @Input() recipeItem: Recipe;

  constructor(private recipeService: RecipeService) {}

  openDescription() {
    this.recipeService.recipeSelected.emit(this.recipeItem);
  }
}
