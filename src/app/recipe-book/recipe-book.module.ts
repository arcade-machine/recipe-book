import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RecipeListComponent } from './list/list.component';
import { RecipeItemComponent } from './list/item/item.component';
import { EditComponent } from './edit/edit.component';

import { DropdownDirective } from '../shared/dropdown.directive';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RouterModule } from '@angular/router';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeBookRoutingModule } from './recipe-book-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    RecipeBookRoutingModule
  ],
  exports: [
    RecipeListComponent,
    RecipeItemComponent,
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
