import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe-book.model';
import { RecipeService } from './recipe.service';

@Component({
    selector: 'app-recipe-book',
    templateUrl: './recipe-book.component.html',
    styleUrls: ['./recipe-book.component.scss'],
    providers: [RecipeService]
})

export class RecipeBookComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private RecipeService: RecipeService) {
  }

  ngOnInit(): void {
      this.RecipeService.recipeSelected.subscribe(
          (recipe: Recipe) => {
              this.selectedRecipe = recipe;
          }
      );
  }
}
