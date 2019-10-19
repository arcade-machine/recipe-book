import { Component } from '@angular/core';
import { RequestsService } from '../shared/requests.service';
import { RecipeService } from '../recipe-book/recipe.service';
import { map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class MainHeaderComponent {
    constructor(
        private requests: RequestsService,
        private recipeService: RecipeService
    ) {}

    saveRecipes() {
      this.requests.storeRecipes().subscribe(
          ((data: []) => {
              console.log(data);
          })
      );
    }

    getRecipes() {
        this.requests.fetchRecipes()
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                        }
                    );
                }),
                tap(recipes => {
                        this.recipeService.setRecipeList(recipes);
                    }
                )
            )
            .subscribe(
                ((data) => {
                    this.recipeService.setRecipeList(data);
                })
        );
    }
}
