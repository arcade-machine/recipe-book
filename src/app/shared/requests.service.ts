import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '../recipe-book/recipe-book.model';
import { RecipeService } from '../recipe-book/recipe.service';

@Injectable({
    providedIn: 'root'
})
export class RequestsService {
    private DATABASE_URL = 'https://angular-project-f5461.firebaseio.com/recipes.json';

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService
) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put(this.DATABASE_URL, recipes);
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(this.DATABASE_URL);
    }
}
