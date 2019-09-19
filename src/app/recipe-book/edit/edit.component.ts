import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe-book.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  moveToShoppingList() {
    this.recipeService.addIngredients(this.recipe.ingredients);
  }
}
