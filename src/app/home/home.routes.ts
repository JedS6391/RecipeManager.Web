import { Routes, Route } from '@angular/router';
import { HomeComponent } from './home.component';

export const HOME_PATH = 'home';

const HOME_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

export const HOME_ROOT_ROUTE: Route = {
    path: HOME_PATH,
    children: HOME_ROUTES
};
