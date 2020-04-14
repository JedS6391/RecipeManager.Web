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
    },
    edit: {
        isLoading: false,
        recipe: null
    }
};

const handlerMap: ActionHandlerMap<RecipeState> = {
    [actions.GetAllRecipes.TYPE]: getAllRecipesHandler,
    [actions.GetAllRecipesSuccess.TYPE]: getAllRecipesSuccessHandler
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
    const newState = {
        list: {
            isLoading: false,
            recipes: action.recipes
        },
        create: state.create,
        edit: state.edit,
    };

    return newState;
}
