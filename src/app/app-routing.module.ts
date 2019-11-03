import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipe-book/recipe-start/recipe-start.component';
import { EditComponent } from './recipe-book/edit/edit.component';
import { RecipeEditComponent } from './recipe-book/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/recipes' },
  { path: 'recipes', component: RecipeBookComponent, canActivate: [AuthGuard],
      children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: EditComponent },
      { path: ':id/edit', component: RecipeEditComponent }
    ] },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'login', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
