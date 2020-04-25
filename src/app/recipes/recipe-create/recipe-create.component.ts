import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipesCreateFacade } from '../store/recipes-store.facade';
import { take, filter, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MessagingService } from 'src/app/shared/messaging.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit {
  public form: FormGroup;

  public isSaving$: Observable<boolean>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private recipesCreateFacade: RecipesCreateFacade,
    private messagingService: MessagingService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });

    this.isSaving$ = this.recipesCreateFacade.isSaving();
  }

  public submitForm(): void {
    if (!this.form.valid) {
      this.messagingService.showMessage('Please enter the required details.', {
        duration: 2000
      });

      return;
    }


    this.recipesCreateFacade.createRecipe({
        name: this.form.value.name
    });

    this.recipesCreateFacade.isSaving().pipe(
      filter(val => !val),
      withLatestFrom(this.recipesCreateFacade.getRecipe()),
      take(1)
    ).subscribe(([, recipe]) => {
      if (recipe) {
        this.router.navigate([`recipes/edit/${recipe.id}`]);
      }
    });
  }
}
