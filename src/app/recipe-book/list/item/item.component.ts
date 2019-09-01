import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})

export class RecipeItemComponent {
  @Input() recipeItem: {name: string, description: string, imagePath: string};
}
