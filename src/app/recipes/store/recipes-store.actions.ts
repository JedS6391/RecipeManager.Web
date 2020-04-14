import { Action } from '@ngrx/store';
import { Recipe } from '../api/models/read/recipe.interface';

const RECIPES_STORE_ACTIONS_PREFIX = 'RECIPES';

export class GetAllRecipes implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} GET ALL RECIPES`;
    public readonly type = GetAllRecipes.TYPE;
}

export class GetAllRecipesSuccess implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} GET ALL RECIPES SUCCESS`;
    public readonly type = GetAllRecipesSuccess.TYPE;

    constructor(public recipes: Recipe[]) {}
}

export class GetAllRecipesFailure implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} GET ALL RECIPES FAILURE`;
    public readonly type = GetAllRecipesFailure.TYPE;

    constructor(public error: Error) {}
}
