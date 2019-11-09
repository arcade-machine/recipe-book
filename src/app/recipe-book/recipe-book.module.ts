import { NgModule } from '@angular/core';

import { RecipeListComponent } from './list/list.component';
import { RecipeItemComponent } from './list/item/item.component';
import { EditComponent } from './edit/edit.component';

import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeBookRoutingModule } from './recipe-book-routing.module';
import { RecipeBookComponent } from './recipe-book.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RecipeBookRoutingModule,
    SharedModule
  ],
  exports: [
    RecipeListComponent,
    RecipeItemComponent
  ],
  declarations: [
    RecipeBookComponent,
    RecipeListComponent,
    RecipeItemComponent,
    EditComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ]
})
export class RecipeBookModule { }
