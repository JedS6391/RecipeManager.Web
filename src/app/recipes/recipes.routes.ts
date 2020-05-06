import { Routes, Route } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';

export const RECIPES_PATH = 'recipes';

const RECIPES_ROUTES: Routes = [
    {
        path: '',
        component: RecipeListComponent,
        canActivate: [AuthenticationGuard],
        data: {
            state: `${RECIPES_PATH}-list`
        }
    },
    {
        path: 'new',
        component: RecipeCreateComponent,
        canActivate: [AuthenticationGuard],
        data: {
            state: `${RECIPES_PATH}-new`
        }
    },
    {
        path: 'edit/:id',
        component: RecipeEditComponent,
        canActivate: [AuthenticationGuard],
        data: {
            state: `${RECIPES_PATH}-edit`
        }
    },
    {
        path: ':id',
        component: RecipeViewComponent,
        canActivate: [AuthenticationGuard],
        data: {
            state: `${RECIPES_PATH}-view`
        }
    }
];

export const RECIPES_ROOT_ROUTE: Route = {
    path: RECIPES_PATH,
    children: RECIPES_ROUTES
};
