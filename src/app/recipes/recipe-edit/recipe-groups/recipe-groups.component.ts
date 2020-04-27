import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Recipe, RecipeGroup } from '../../api/models/read/recipe.interface';
import { RecipesEditFacade } from '../../store/recipes-store.facade';

@Component({
  selector: 'app-recipe-groups',
  templateUrl: './recipe-groups.component.html',
  styleUrls: ['./recipe-groups.component.scss']
})
export class RecipeGroupsComponent implements OnInit, OnDestroy {
  @Input()
  public recipe: Recipe;

  @Input()
  public form: FormGroup;

  public readonly separatorKeysCodes = [ENTER, COMMA];

  public availableRecipeGroups$: Observable<RecipeGroup[]>;

  private destroyed$ = new Subject();

  constructor(
    private recipesEditFacade: RecipesEditFacade,
    private fb: FormBuilder
  ) { }

  public get groups() {
    return this.form.get('groups') as FormArray;
  }

  ngOnInit() {
    this.availableRecipeGroups$ = combineLatest(
      this.form.valueChanges,
      this.recipesEditFacade.getRecipeGroups()
    ).pipe(
      map(([changes, allRecipeGroups]) => {
        const selectedGroupNames = new Set(changes.groups.map(group => group.name));

        return allRecipeGroups.filter(group => !selectedGroupNames.has(group.name));
      })
    );
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  public addRecipeGroup(event: MatChipInputEvent): void {
    if ((event.value || '').trim()) {
      const existingGroupNames = new Set(this.groups.value.map(group => group.name.toLowerCase()));

      // Make sure we only add new group names
      if (!existingGroupNames.has(event.value.trim().toLowerCase())) {
        this.groups.push(this.fb.group({
          groupId: '',
          name: [event.value.trim(), Validators.required]
        }));
      }
    }

    // Reset the input value to clear the field for the next group addition.
    event.input.value = '';
  }

  public selectRecipeGroup(event: MatAutocompleteSelectedEvent): void {
    this.groups.push(this.fb.group({
      groupId: [event.option.value.id],
      name: [event.option.value.name, Validators.required]
    }));
  }

  public removeRecipeGroup(groupIndex: number): void {
    this.groups.removeAt(groupIndex);
  }
}
