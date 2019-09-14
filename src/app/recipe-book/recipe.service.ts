import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe-book.model';

@Injectable()

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipesList: Recipe[] = [
        new Recipe('Thats a first recipe name', 'We talking about description that no1 will ever use (but me)', 'https://img.taste.com.au/GR-XKpyy/taste/2014/10/australias-most-cooked-pancake-recipe-118377-2.jpg'),
        new Recipe('That some kind of another recipe name', 'Hey, im a pancake', 'https://img.taste.com.au/GR-XKpyy/taste/2014/10/australias-most-cooked-pancake-recipe-118377-2.jpg')
    ];

    getRecipes() {
        return this.recipesList.slice();
    }
}
