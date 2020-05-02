import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';
import { AuthenticationGuard } from './authentication.guard';
import { TokenStoreService } from './token-store.service';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    TokenStoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AuthenticationModule { }
