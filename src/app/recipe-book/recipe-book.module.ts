import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { RecipeListComponent } from './list/list.component';
import { RecipeItemComponent } from './list/item/item.component';
import { EditComponent } from './edit/edit.component';

import { DropdownDirective } from '../shared/dropdown.directive';

@NgModule({
    imports: [
      BrowserModule,
      CommonModule
    ],
  exports: [
    RecipeListComponent,
    RecipeItemComponent,
    EditComponent,
    DropdownDirective
  ],
    declarations: [
        RecipeListComponent,
        RecipeItemComponent,
        DropdownDirective,
        EditComponent
    ]
})
export class RecipeBookModule { }
