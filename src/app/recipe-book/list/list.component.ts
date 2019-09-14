import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe-book.model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class RecipeListComponent implements OnInit {
    recipesList: Recipe[];

    constructor(private recipeService: RecipeService) {
    }

    ngOnInit() {
        this.recipesList = this.recipeService.getRecipes();
    }
}
