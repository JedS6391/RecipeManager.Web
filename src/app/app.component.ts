import { Store, select } from '@ngrx/store';

import { Component, OnInit } from '@angular/core';
import { ErrorService } from './shared/error.service';
import { recipeErrorState } from './recipes/store/recipes-store.selectors';
import { cartErrorState } from './cart/store/cart-store.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'RecipeManager';

  constructor(private store: Store<any>, private errorService: ErrorService) {}

  public ngOnInit(): void {
    this.errorService.registerErrorStream('recipes', this.store.pipe(
      select(recipeErrorState)
    ));

    this.errorService.registerErrorStream('cart', this.store.pipe(
      select(cartErrorState)
    ));
  }
}
