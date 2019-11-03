import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Recipe } from '../recipe-book/recipe-book.model';
import { RecipeService } from '../recipe-book/recipe.service';
import { AuthService } from '../auth/auth.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RequestsService {
    private DATABASE_URL = 'https://angular-project-f5461.firebaseio.com/recipes.json';

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        return this.http
            .put(this.DATABASE_URL, recipes);
    }

    fetchRecipes() {
        this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                return this.http
                    .get<Recipe[]>(this.DATABASE_URL,
                        {
                            params: new HttpParams().set('auth', user.token)
                        });
            }),
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
