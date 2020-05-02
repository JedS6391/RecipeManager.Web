import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStoreService } from './token-store.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private tokenStoreService: TokenStoreService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.tokenStoreService.token}`
            }
        });

        return next.handle(request);
    }
}
