import { Action } from '@ngrx/store';
import { Recipe, IngredientCategory } from '../api/models/read/recipe.interface';
import { CreateIngredient } from '../api/models/write/create-ingredient.interface';
import { UpdateRecipe } from '../api/models/write/update-recipe.interface';
import { CreateRecipe } from '../api/models/write/create-recipe.interface';

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

export class GetRecipe implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} GET RECIPE`;
    public readonly type = GetRecipe.TYPE;

    constructor(public recipeId: string) {}
}

export class GetRecipeSuccess implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} GET RECIPE SUCCESS`;
    public readonly type = GetRecipeSuccess.TYPE;

    constructor(public recipe: Recipe) {}
}

export class GetRecipeFailure implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} GET RECIPE FAILURE`;
    public readonly type = GetRecipeFailure.TYPE;

    constructor(public error: Error) {}
}

export class GetIngredientCategories implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} GET INGREDIENT CATEGORIES`;
    public readonly type = GetIngredientCategories.TYPE;

    constructor() {}
}

export class GetIngredientCategoriesSuccess implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} GET INGREDIENT CATEGORIES SUCCESS`;
    public readonly type = GetIngredientCategoriesSuccess.TYPE;

    constructor(public ingredientCategories: IngredientCategory[]) {}
}

export class GetIngredientCategoriesFailure implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} GET INGREDIENT CATEGORIES FAILURE`;
    public readonly type = GetIngredientCategoriesFailure.TYPE;

    constructor(public error: Error) {}
}

export class CreateRecipeAction implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} CREATE RECIPE`;
    public readonly type = CreateRecipeAction.TYPE;

    constructor(public recipe: CreateRecipe) {}
}

export class CreateRecipeSuccess implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} CREATE RECIPE SUCCESS`;
    public readonly type = CreateRecipeSuccess.TYPE;

    constructor(public recipe: Recipe) {}
}

export class CreateRecipeFailure implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} CREATE RECIPE FAILURE`;
    public readonly type = CreateRecipeFailure.TYPE;

    constructor(public error: Error) {}
}

export class UpdateRecipeAction implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} UPDATE RECIPE`;
    public readonly type = UpdateRecipeAction.TYPE;

    constructor(
        public recipe: UpdateRecipe,
        public ingredients: CreateIngredient[]
    ) {}
}

export class UpdateRecipeSuccess implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} UPDATE RECIPE SUCCESS`;
    public readonly type = UpdateRecipeSuccess.TYPE;

    constructor(public recipe: Recipe) {}
}

export class UpdateRecipeFailure implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} UPDATE RECIPE FAILURE`;
    public readonly type = UpdateRecipeFailure.TYPE;

    constructor(public error: Error) {}
}

export class UpdateRecipeIngredientsAction implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} UPDATE RECIPE INGREDIENTS`;
    public readonly type = UpdateRecipeIngredientsAction.TYPE;

    constructor(
        public recipe: UpdateRecipe,
        public ingredients: CreateIngredient[],
        public success: (Recipe) => Action,
        public error: (Error) => Action
    ) {}
}
