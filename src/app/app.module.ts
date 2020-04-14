import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppConfigurationModule } from './configuration/app-configuration';
import { AuthenticationModule } from './authentication/authentication.module';
import { RecipesModule } from './recipes/recipes.module';
import { RECIPES_BASE_URL_TOKEN } from './recipes/api/recipe-api.service';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppConfigurationModule,
    AuthenticationModule,
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
