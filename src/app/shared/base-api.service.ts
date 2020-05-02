import { HttpClient, HttpHeaders } from '@angular/common/http';

export class BaseApiService {

    constructor(
        protected baseUrl: string,
        protected http: HttpClient
    ) {}
}
