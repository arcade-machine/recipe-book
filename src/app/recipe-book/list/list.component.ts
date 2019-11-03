import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../recipe-book.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { RequestsService } from '../../shared/requests.service';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class RecipeListComponent implements OnInit, OnDestroy {
    recipesList: Recipe[];
    subscription: Subscription;

    constructor(private recipeService: RecipeService,
                private route: Router,
                private activeRoute: ActivatedRoute,
                private requestService: RequestsService) {
    }

    ngOnInit() {
        this.recipesList = this.recipeService.getRecipes();
        this.subscription = this.recipeService.recipeChanging.subscribe(
          (recipe: Recipe[]) => {
            this.recipesList = recipe;
          }
        );
        this.requestService.fetchRecipes();
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

  onNewRecipe() {
        this.route.navigate(['new'], {relativeTo: this.activeRoute});
    }
}
