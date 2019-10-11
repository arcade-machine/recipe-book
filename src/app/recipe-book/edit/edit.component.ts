import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe-book.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
 recipe: Recipe;
 id: number;

  constructor(private recipeService: RecipeService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }

  moveToShoppingList() {
    this.recipeService.addIngredients(this.recipe.ingredients);
  }
}
