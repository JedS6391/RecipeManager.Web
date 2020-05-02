import { Component, OnInit, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as Sentry from '@sentry/browser';

import { ErrorService } from './shared/error.service';
import { recipeErrorState } from './recipes/store/recipes-store.selectors';
import { cartErrorState } from './cart/store/cart-store.selectors';
import { APP_CONFIGURATION, AppConfiguration } from './configuration/app-configuration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
}
