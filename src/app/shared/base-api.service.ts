import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStoreService } from '../authentication/token-store.service';

export class BaseApiService {

    constructor(
        protected baseUrl: string,
        protected http: HttpClient,
        protected tokenStoreService: TokenStoreService
    ) {}

    protected getHeaders(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.tokenStoreService.token}`
        });
    }
}
