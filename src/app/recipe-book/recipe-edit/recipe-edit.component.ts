import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ActivatedRoute, Params } from '@angular/router';
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
                'name': new FormControl(ingredient.name),
                'amount': new FormControl(ingredient.amount)
              })
          );
        });
      }
    }

    this.editRecipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imgPath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': this.ingredientList
    });
    console.log(this.ingredientList);
  }

  onSubmit(form: FormGroup) {
    const recipeName = form.value.name;
    const recipeImgPath = form.value.imgPath;
    const recipeDescription = form.value.description;
    const newRecipe = new Recipe(recipeName, recipeDescription, recipeImgPath, []);
    this.recipeService.addRecipe(newRecipe);
    form.reset();
  }

  addIngredient() {
    (<FormArray> this.editRecipeForm.get('ingredients')).push(
        new FormGroup({
          'name': new FormControl(),
          'amount': new FormControl()
        })
    );
  }
}
