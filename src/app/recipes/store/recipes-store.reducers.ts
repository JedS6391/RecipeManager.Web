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
            instructions: []
        }
    },
    edit: {
        isLoading: false,
        isSaving: false,
        saveSuccessful: false,
        recipe: {
            id: '',
            name: '',
            ingredients: [],
            instructions: []
        }
    }
};

// TODO: Failure reducers
const handlerMap: ActionHandlerMap<RecipeState> = {
    [actions.GetAllRecipes.TYPE]: getAllRecipesHandler,
    [actions.GetAllRecipesSuccess.TYPE]: getAllRecipesSuccessHandler,
    [actions.GetRecipe.TYPE]: getRecipeHandler,
    [actions.GetRecipeSuccess.TYPE]: getRecipeSuccessHandler,
    [actions.CreateRecipeAction.TYPE]: createRecipeHandler,
    [actions.CreateRecipeSuccess.TYPE]: createRecipeSuccessHandler,
    [actions.UpdateRecipeAction.TYPE]: updateRecipeHandler,
    [actions.UpdateRecipeSuccess.TYPE]: updateRecipeSuccessHandler
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
        edit: state.edit
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
            recipe: state.edit.recipe
        }
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
            recipe: action.recipe
        }
    };
}

function createRecipeHandler(state: RecipeState): RecipeState {
    return {
        list: state.list,
        create: {
            isLoading: false,
            isSaving: true,
            recipe: state.create.recipe
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
            recipe: action.recipe
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
            recipe: state.edit.recipe
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
            recipe: action.recipe
        }
    };
}
