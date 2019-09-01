import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe-book.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class RecipeListComponent implements OnInit {
    recipesList: Recipe[] = [
        new Recipe('Test name', 'Test desc', 'https://img.taste.com.au/GR-XKpyy/taste/2014/10/australias-most-cooked-pancake-recipe-118377-2.jpg'),
        new Recipe('Test name', 'Test desc', 'https://img.taste.com.au/GR-XKpyy/taste/2014/10/australias-most-cooked-pancake-recipe-118377-2.jpg')
    ];

    constructor() {
    }

    ngOnInit() {
    }
}
