import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestsService } from '../shared/requests.service';
import { RecipeService } from '../recipe-book/recipe.service';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class MainHeaderComponent implements OnInit, OnDestroy {
    isAuth = false;
    private _userSub: Subscription;

    constructor(
        private requests: RequestsService,
        private recipeService: RecipeService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this._userSub = this.authService.user.subscribe(user => {
            this.isAuth = !!user;
        });
    }

    ngOnDestroy(): void {
        this._userSub.unsubscribe();
    }

    saveRecipes() {
      this.requests.storeRecipes().subscribe(
          ((data: []) => {
              console.log(data);
          })
      );
    }

    getRecipes() {
        this.requests.fetchRecipes();
    }
}
