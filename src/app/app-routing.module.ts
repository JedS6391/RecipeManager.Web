import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HOME_ROOT_ROUTE } from './home/home.routes';
import { RECIPES_ROOT_ROUTE } from './recipes/recipes.routes';


const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: '',
                redirectTo: HOME_ROOT_ROUTE.path,
                pathMatch: 'full'
            },
            HOME_ROOT_ROUTE,
            RECIPES_ROOT_ROUTE
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
