import { NgModule } from '@angular/core';

import { RecipeItemComponent } from './item/item.component';

@NgModule({
    exports: [
        RecipeItemComponent
    ],
    declarations: [
        RecipeItemComponent
    ]
})
export class RecipeBookListModule { }
