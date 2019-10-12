import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../recipe-book.model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class RecipeListComponent implements OnInit {
    recipesList: Recipe[];

    constructor(private recipeService: RecipeService,
                private route: Router,
                private activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.recipesList = this.recipeService.getRecipes();
    }

    onNewRecipe() {
        this.route.navigate(['new'], {relativeTo: this.activeRoute});
    }
}
