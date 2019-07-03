import { NgModule } from '@angular/core';

import { RecipeListComponent } from './list/list.component';
import { RecipeItemComponent } from './list/item/item.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
    exports: [
        RecipeListComponent,
        RecipeItemComponent,
        EditComponent
    ],
    declarations: [
        RecipeListComponent,
        RecipeItemComponent,
        EditComponent
    ]
})
export class RecipeBookModule { }
