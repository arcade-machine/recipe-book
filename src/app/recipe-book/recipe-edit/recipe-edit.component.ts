import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Recipe } from '../recipe-book.model';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  editRecipeForm: FormGroup;
  onSubscribe: Subscription;
  editedRecipe: Recipe;
  ingredientList = new FormArray([]);

  constructor(private activeRoute: ActivatedRoute,
              private route: Router,
              private recipeService: RecipeService) {}

  ngOnInit() {
    this.activeRoute.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
    );

    this.onSubscribe = this.recipeService.startedEditing.subscribe(
      (index: number) => {
        if (this.editMode) {
          this.editedRecipe = this.recipeService.editedRecipe(index);
          this.editRecipeForm.controls.name.setValue(this.editedRecipe.name);
        }
      }
    );

  }

  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe['ingredients']) {
        recipe.ingredients.forEach(ingredient => {
          this.ingredientList.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
              })
          );
        });
      }
    }

    this.editRecipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': this.ingredientList
    });
  }

  onSubmit(form: FormGroup) {
    // const newRecipe = new Recipe(
    //   form.value.name,
    //   form.value.description,
    //   form.value.imgPath,
    //   form.value.ingredients
    // );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, form.value);
    } else {
      this.recipeService.addRecipe(form.value);
    }
    this.clearForm(form);
  }

  addIngredient() {
    (<FormArray> this.editRecipeForm.get('ingredients')).push(
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
        })
    );
  }

  clearForm(form: FormGroup) {
    form.reset();
    this.route.navigate(['../'], {relativeTo: this.activeRoute});
  }

  deleteIngredient(index: number) {
    (<FormArray> this.editRecipeForm.get('ingredients')).removeAt(index);
  }
}
