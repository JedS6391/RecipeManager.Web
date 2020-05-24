import { Action } from '@ngrx/store';
import { Recipe, IngredientCategory, RecipeGroup } from '../api/models/read/recipe.interface';
import { CreateIngredient } from '../api/models/write/create-ingredient.interface';
import { UpdateRecipe } from '../api/models/write/update-recipe.interface';
import { CreateRecipe } from '../api/models/write/create-recipe.interface';
import { UpdateRecipeGroups } from '../api/models/write/update-recipe-groups.interface';
import { ImportRecipe } from '../api/models/write/import-recipe.interface';
import { RecipeImportJob } from '../api/models/read/recipe-import-job.interface';

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

export class GetRecipeGroups implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} GET RECIPE GROUPS`;
    public readonly type = GetRecipeGroups.TYPE;

    constructor() {}
}

export class GetRecipeGroupsSuccess implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} GET RECIPE GROUPS SUCCESS`;
    public readonly type = GetRecipeGroupsSuccess.TYPE;

    constructor(public recipeGroups: RecipeGroup[]) {}
}

export class GetRecipeGroupsFailure implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} GET RECIPE GROUPS FAILURE`;
    public readonly type = GetRecipeGroupsFailure.TYPE;

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
        public ingredients: CreateIngredient[],
        public recipeGroups: UpdateRecipeGroups
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

export class UpdateRecipeGroupsAction implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} UPDATE RECIPE GROUPS`;
    public readonly type = UpdateRecipeGroupsAction.TYPE;

    constructor(
        public recipe: UpdateRecipe,
        public recipeGroups: UpdateRecipeGroups,
        public success: (Recipe) => Action,
        public error: (Error) => Action
    ) {}
}

export class DeleteRecipeAction implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} DELETE RECIPE`;
    public readonly type = DeleteRecipeAction.TYPE;

    constructor(public recipeId: string) {}
}

export class DeleteRecipeSuccess implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} DELETE RECIPE SUCCESS`;
    public readonly type = DeleteRecipeSuccess.TYPE;

    constructor() {}
}

export class DeleteRecipeFailure implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} DELETE RECIPE FAILURE`;
    public readonly type = DeleteRecipeFailure.TYPE;

    constructor(public error: Error) {}
}

export class ImportRecipeAction implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} IMPORT RECIPE`;
    public readonly type = ImportRecipeAction.TYPE;

    constructor(public recipe: ImportRecipe) {}
}

export class ImportRecipeSuccess implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} IMPORT RECIPE SUCCESS`;
    public readonly type = ImportRecipeSuccess.TYPE;

    constructor(public job: RecipeImportJob) {}
}

export class ImportRecipeFailure implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} IMPORT RECIPE FAILURE`;
    public readonly type = ImportRecipeFailure.TYPE;

    constructor(public error: Error) {}
}

export class GetRecipeImportJobAction implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} GET RECIPE IMPORT JOB`;
    public readonly type = GetRecipeImportJobAction.TYPE;

    constructor(public jobId: string) {}
}

export class GetRecipeImportJobSuccess implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} GET RECIPE IMPORT JOB SUCCESS`;
    public readonly type = GetRecipeImportJobSuccess.TYPE;

    constructor(public job: RecipeImportJob) {}
}

export class GetRecipeImportJobFailure implements Action {
    public static readonly TYPE = `${RECIPES_STORE_ACTIONS_PREFIX} GET RECIPE IMPORT JOB FAILURE`;
    public readonly type = GetRecipeImportJobFailure.TYPE;

    constructor(public error: Error) {}
}
