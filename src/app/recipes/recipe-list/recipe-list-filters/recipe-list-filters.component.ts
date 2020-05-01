import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { RecipesEditFacade } from '../../store/recipes-store.facade';
import { RecipeGroup } from '../../api/models/read/recipe.interface';

@Component({
  selector: 'app-recipe-list-filters',
  templateUrl: './recipe-list-filters.component.html',
  styleUrls: ['./recipe-list-filters.component.scss']
})
export class RecipeListFiltersComponent implements OnInit {

  @Input()
  public collapsed = true;

  @Output()
  public searchTermChange = new EventEmitter<string>();

  @Output()
  public selectedRecipeGroupsChange = new EventEmitter<RecipeGroup[]>();

  public allRecipeGroups$: Observable<RecipeGroup[]>;

  public selectedRecipeGroups: RecipeGroup[] = [];

  constructor(private recipesEditFacade: RecipesEditFacade) { }

  ngOnInit() {
    this.recipesEditFacade.fetchRecipeGroups();

    this.allRecipeGroups$ = this.recipesEditFacade.getRecipeGroups();
  }

  public onSearchTermChanged(searchTerm: string) {
    this.searchTermChange.next(searchTerm);
  }

  public onSelectedRecipeGroupsChanged(selectedRecipeGroups: RecipeGroup[]) {
    this.selectedRecipeGroupsChange.next(selectedRecipeGroups);
  }
}
