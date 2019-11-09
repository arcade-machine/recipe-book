import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRouterModule } from './shopping-list-router.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ShoppingListRouterModule
    ],
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ]
})
export class ShoppingListModule {}
