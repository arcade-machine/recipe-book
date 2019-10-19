import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


import { RecipeListComponent } from './list/list.component';
import { RecipeItemComponent } from './list/item/item.component';
import { EditComponent } from './edit/edit.component';

import { DropdownDirective } from '../shared/dropdown.directive';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RouterModule } from '@angular/router';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
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
    EditComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ]
})
export class RecipeBookModule { }
