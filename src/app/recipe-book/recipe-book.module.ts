import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { RecipeListComponent } from './list/list.component';
import { RecipeItemComponent } from './list/item/item.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [
      BrowserModule,
      CommonModule
    ],
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
