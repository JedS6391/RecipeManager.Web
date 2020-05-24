import { RecipeState } from './recipes-state';
import * as actions from './recipes-store.actions';
import { ActionHandlerMap, executeReducer } from '../../shared/reducer-helpers';
import { Action } from '@ngrx/store';

export const RECIPES_INITIAL_STATE: RecipeState = {
    list: {
        isLoading: false,
        recipes: []
    },
    create: {
        isLoading: false,
        isSaving: false,
        recipe: {
            id: '',
            name: '',
            ingredients: [],
            instructions: [],
            groups: []
        },
        importJob: null
    },
    edit: {
        isLoading: false,
        isSaving: false,
        saveSuccessful: false,
        recipe: {
            id: '',
            name: '',
            ingredients: [],
            instructions: [],
            groups: []
        },
        ingredientCategories: [],
        recipeGroups: []
    },
    error: null
};

const handlerMap: ActionHandlerMap<RecipeState> = {
    [actions.GetAllRecipes.TYPE]: getAllRecipesHandler,
    [actions.GetAllRecipesSuccess.TYPE]: getAllRecipesSuccessHandler,
    [actions.GetAllRecipesFailure.TYPE]: getAllRecipesFailureHandler,
    [actions.GetRecipe.TYPE]: getRecipeHandler,
    [actions.GetRecipeSuccess.TYPE]: getRecipeSuccessHandler,
    [actions.GetRecipeFailure.TYPE]: getRecipeFailureHandler,
    [actions.GetIngredientCategories.TYPE]: getIngredientCategoriesHandler,
    [actions.GetIngredientCategoriesSuccess.TYPE]: getIngredientCategoriesSuccessHandler,
    [actions.GetIngredientCategoriesFailure.TYPE]: getIngredientCategoriesFailureHandler,
    [actions.GetRecipeGroups.TYPE]: getRecipeGroupsHandler,
    [actions.GetRecipeGroupsSuccess.TYPE]: getRecipeGroupsSuccessHandler,
    [actions.GetRecipeGroupsFailure.TYPE]: getRecipeGroupsFailureHandler,
    [actions.GetRecipeImportJobAction.TYPE]: getRecipeImportJobHandler,
    [actions.GetRecipeImportJobSuccess.TYPE]: getRecipeImportJobSuccessHandler,
    [actions.CreateRecipeAction.TYPE]: createRecipeHandler,
    [actions.CreateRecipeSuccess.TYPE]: createRecipeSuccessHandler,
    [actions.ImportRecipeAction.TYPE]: importRecipeHandler,
    [actions.ImportRecipeSuccess.TYPE]: importRecipeSuccessHandler,
    [actions.UpdateRecipeAction.TYPE]: updateRecipeHandler,
    [actions.UpdateRecipeSuccess.TYPE]: updateRecipeSuccessHandler,
    [actions.DeleteRecipeAction.TYPE]: deleteRecipeHandler,
    [actions.DeleteRecipeSuccess.TYPE]: deleteRecipeSuccessHandler
};

export function recipesReducer(state: RecipeState = RECIPES_INITIAL_STATE, action: Action): RecipeState {
    return executeReducer(state, action, handlerMap);
}

function getAllRecipesHandler(state: RecipeState): RecipeState {
    return {
        list: {
            isLoading: true,
            recipes: state.list.recipes
        },
        create: state.create,
        edit: state.edit,
        error: null
    };
}

function getAllRecipesSuccessHandler(state: RecipeState, action: actions.GetAllRecipesSuccess): RecipeState {
    return {
        list: {
            isLoading: false,
            recipes: action.recipes
        },
        create: state.create,
        edit: state.edit,
        error: null
    };
}

function getAllRecipesFailureHandler(state: RecipeState, action: actions.GetAllRecipesFailure): RecipeState {
    return {
        list: {
            isLoading: false,
            recipes: []
        },
        create: state.create,
        edit: state.edit,
        error: action.error
    };
}

function getRecipeHandler(state: RecipeState): RecipeState {
    return {
        list: state.list,
        create: state.create,
        edit: {
            isLoading: true,
            isSaving: false,
            saveSuccessful: false,
            recipe: state.edit.recipe,
            ingredientCategories: state.edit.ingredientCategories,
            recipeGroups: state.edit.recipeGroups
        },
        error: null
    };
}

function getRecipeSuccessHandler(state: RecipeState, action: actions.GetRecipeSuccess): RecipeState {
    return {
        list: state.list,
        create: state.create,
        edit: {
            isLoading: false,
            isSaving: false,
            saveSuccessful: false,
            recipe: action.recipe,
            ingredientCategories: state.edit.ingredientCategories,
            recipeGroups: state.edit.recipeGroups
        },
        error: null
    };
}

function getRecipeFailureHandler(state: RecipeState, action: actions.GetRecipeFailure): RecipeState {
    return {
        list: state.list,
        create: state.create,
        edit: {
            isLoading: false,
            isSaving: false,
            saveSuccessful: false,
            recipe: null,
            ingredientCategories: state.edit.ingredientCategories,
            recipeGroups: state.edit.recipeGroups
        },
        error: action.error
    };
}

function getIngredientCategoriesHandler(state: RecipeState): RecipeState {
    return {
        list: state.list,
        create: state.create,
        edit: {
            isLoading: true,
            isSaving: false,
            saveSuccessful: false,
            recipe: state.edit.recipe,
            ingredientCategories: state.edit.ingredientCategories,
            recipeGroups: state.edit.recipeGroups
        },
        error: null
    };
}

function getIngredientCategoriesSuccessHandler(state: RecipeState, action: actions.GetIngredientCategoriesSuccess): RecipeState {
    return {
        list: state.list,
        create: state.create,
        edit: {
            isLoading: false,
            isSaving: false,
            saveSuccessful: false,
            recipe: state.edit.recipe,
            ingredientCategories: action.ingredientCategories,
            recipeGroups: state.edit.recipeGroups
        },
        error: null
    };
}

function getIngredientCategoriesFailureHandler(state: RecipeState, action: actions.GetIngredientCategoriesFailure): RecipeState {
    return {
        list: state.list,
        create: state.create,
        edit: {
            isLoading: false,
            isSaving: false,
            saveSuccessful: false,
            recipe: state.edit.recipe,
            ingredientCategories: [],
            recipeGroups: state.edit.recipeGroups
        },
        error: action.error
    };
}

function getRecipeGroupsHandler(state: RecipeState): RecipeState {
    return {
        list: state.list,
        create: state.create,
        edit: {
            isLoading: true,
            isSaving: false,
            saveSuccessful: false,
            recipe: state.edit.recipe,
            ingredientCategories: state.edit.ingredientCategories,
            recipeGroups: state.edit.recipeGroups
        },
        error: null
    };
}

function getRecipeGroupsSuccessHandler(state: RecipeState, action: actions.GetRecipeGroupsSuccess): RecipeState {
    return {
        list: state.list,
        create: state.create,
        edit: {
            isLoading: false,
            isSaving: false,
            saveSuccessful: false,
            recipe: state.edit.recipe,
            ingredientCategories: state.edit.ingredientCategories,
            recipeGroups: action.recipeGroups
        },
        error: null
    };
}

function getRecipeImportJobHandler(state: RecipeState): RecipeState {
    return {
        list: state.list,
        create: {
            isLoading: true,
            isSaving: false,
            recipe: state.create.recipe,
            importJob: state.create.importJob
        },
        edit: state.edit,
        error: null
    };
}

function getRecipeImportJobSuccessHandler(state: RecipeState, action: actions.GetRecipeImportJobSuccess): RecipeState {
    return {
        list: state.list,
        create: {
            isLoading: false,
            isSaving: false,
            recipe: state.create.recipe,
            importJob: action.job
        },
        edit: state.edit,
        error: null
    };
}

function getRecipeGroupsFailureHandler(state: RecipeState, action: actions.GetRecipeGroupsFailure): RecipeState {
    return {
        list: state.list,
        create: state.create,
        edit: {
            isLoading: false,
            isSaving: false,
            saveSuccessful: false,
            recipe: state.edit.recipe,
            ingredientCategories: state.edit.ingredientCategories,
            recipeGroups: []
        },
        error: action.error
    };
}

function createRecipeHandler(state: RecipeState): RecipeState {
    return {
        list: state.list,
        create: {
            isLoading: false,
            isSaving: true,
            recipe: state.create.recipe,
            importJob: state.create.importJob
        },
        edit: state.edit
    };
}

function createRecipeSuccessHandler(state: RecipeState, action: actions.CreateRecipeSuccess): RecipeState {
    return {
        list: state.list,
        create: {
            isLoading: false,
            isSaving: false,
            recipe: action.recipe,
            importJob: state.create.importJob
        },
        edit: state.edit
    };
}

function importRecipeHandler(state: RecipeState): RecipeState {
    return {
        list: state.list,
        create: {
            isLoading: true,
            isSaving: false,
            recipe: state.create.recipe,
            importJob: null
        },
        edit: state.edit
    };
}

function importRecipeSuccessHandler(state: RecipeState, action: actions.ImportRecipeSuccess): RecipeState {
    return {
        list: state.list,
        create: {
            isLoading: false,
            isSaving: false,
            recipe: state.create.recipe,
            importJob: action.job
        },
        edit: state.edit
    };
}

function updateRecipeHandler(state: RecipeState): RecipeState {
    return {
        list: state.list,
        create: state.create,
        edit: {
            isLoading: false,
            isSaving: true,
            saveSuccessful: false,
            recipe: state.edit.recipe,
            ingredientCategories: state.edit.ingredientCategories,
            recipeGroups: state.edit.recipeGroups
        }
    };
}

function updateRecipeSuccessHandler(state: RecipeState, action: actions.UpdateRecipeSuccess): RecipeState {
    return {
        list: state.list,
        create: state.create,
        edit: {
            isLoading: false,
            isSaving: false,
            saveSuccessful: true,
            recipe: action.recipe,
            ingredientCategories: state.edit.ingredientCategories,
            recipeGroups: state.edit.recipeGroups
        }
    };
}


function deleteRecipeHandler(state: RecipeState): RecipeState {
    return {
        list: {
            isLoading: true,
            recipes: state.list.recipes
        },
        create: state.create,
        edit: state.edit
    };
}

function deleteRecipeSuccessHandler(state: RecipeState): RecipeState {
    return {
        list: {
            isLoading: false,
            recipes: state.list.recipes
        },
        create: state.create,
        edit: state.edit
    };
}
