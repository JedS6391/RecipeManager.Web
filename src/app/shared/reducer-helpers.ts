import { ActionReducer, Action } from '@ngrx/store';

export interface ActionHandlerMap<T> {
    [index: string]: ActionReducer<T>;
}

export function executeReducer<T>(state: T, action: Action, handlers: ActionHandlerMap<T>): T {
    const handler = handlers[action.type];

    // If no handler is found for the action, it means it is an action we haven't registered ourselves
    // (e.g. from rxjs itself) so we just return the unchanged state in that case.
    return handler ?
        handler(state, action) :
        state;
}
