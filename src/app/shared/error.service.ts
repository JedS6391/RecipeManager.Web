import { Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';

import { MessagingService } from './messaging.service';
import { Observable } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Injectable()
export class ErrorService {

    private errorStreams: Map<string, Observable<Error>>;

    constructor(private messagingService: MessagingService) {
        this.errorStreams = new Map<string, Observable<Error>>();
    }

    public registerErrorStream(errorType: string, errorStream: Observable<Error>): void {
        this.errorStreams.set(errorType, errorStream);

        errorStream.pipe(
            // Cater for if multiple errors come through at once.
            filter(error => error !== null && error !== undefined),
            debounceTime(2000)
        ).subscribe(error => this.handleError(error));
    }

    private handleError(error: Error): void {
        console.log('Encountered unexpected error.');
        console.log(error);

        const eventId = Sentry.captureException(error);

        this.messagingService.showMessageWithAction(
            'Unexpected error encountered.',
            'Report issue',
            () => {
                Sentry.showReportDialog({ eventId });
            },
            {
                duration: 10000
            });
    }
}
