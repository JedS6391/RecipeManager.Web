import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { storeLogger } from 'ngrx-store-logger';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfigurationModule } from './configuration/app-configuration';
import { AuthenticationModule } from './authentication/authentication.module';
import { RecipesModule } from './recipes/recipes.module';
import { RECIPES_BASE_URL_TOKEN } from './recipes/api/recipe-api.service';
import { environment } from 'src/environments/environment';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { SpinnerModule } from './shared/spinner/spinner.module';

function logger(reducer: any): any {
  return storeLogger()(reducer);
}

const metaReducers = !environment.production ? [logger] : [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    AppConfigurationModule,
    AuthenticationModule,
    SpinnerModule,
    HomeModule,
    ProfileModule,
    RecipesModule
  ],
  providers: [
    {
      provide: RECIPES_BASE_URL_TOKEN,
      useValue: environment.baseUrl
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
