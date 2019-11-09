import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { RecipeBookComponent } from './recipe-book.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [{
    path: '', component: RecipeBookComponent, canActivate: [AuthGuard],
    children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: EditComponent },
        { path: ':id/edit', component: RecipeEditComponent }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RecipeBookRoutingModule {

}
