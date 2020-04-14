import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RecipeApiService } from '../api/recipe-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private recipeApiService: RecipeApiService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ''
    });
  }

  public submitForm(): void {
    this.recipeApiService.createRecipe({
        name: this.form.value.name
    }).subscribe(recipe => {
        this.router.navigate([`recipes/edit/${recipe.id}`]);
    });
  }
}
