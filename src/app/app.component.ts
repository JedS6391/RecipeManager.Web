import { Component, OnInit, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, style, query, transition, group, animate } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import * as Sentry from '@sentry/browser';

import { ErrorService } from './shared/error.service';
import { recipeErrorState } from './recipes/store/recipes-store.selectors';
import { cartErrorState } from './cart/store/cart-store.selectors';
import { APP_CONFIGURATION, AppConfiguration } from './configuration/app-configuration';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' })
      , { optional: true }),
    group([
      query(':enter', [
        query('.c', [
          style({ opacity: 0 }),
          animate('0.5s', style({ opacity: 1 }))
        ])
      ], { optional: true }),
      query(':leave', [
        query('.c', [
          style({ opacity: 1 }),
          animate('0.3s', style({ opacity: 0 }))
        ])
      ], { optional: true }),
    ])
  ])
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit {
  title = 'RecipeManager';

  constructor(
    @Inject(APP_CONFIGURATION) private appConfiguration: AppConfiguration,
    private store: Store<any>,
    private errorService: ErrorService) {}

  public ngOnInit(): void {
    Sentry.init({
      dsn: this.appConfiguration.monitoring.sentryDsn
    });

    this.errorService.registerErrorStream('recipes', this.store.pipe(
      select(recipeErrorState)
    ));

    this.errorService.registerErrorStream('cart', this.store.pipe(
      select(cartErrorState)
    ));
  }

  public getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }
}
