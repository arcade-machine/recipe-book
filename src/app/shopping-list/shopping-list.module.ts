import { NgModule } from '@angular/core';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRouterModule } from './shopping-list-router.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        ShoppingListRouterModule,
        SharedModule
    ],
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ]
})
export class ShoppingListModule {}
