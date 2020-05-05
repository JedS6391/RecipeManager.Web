import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface MessageOptions {
    duration: number;
}

@Injectable()
export class MessagingService {
    constructor(private snackBar: MatSnackBar) {}

    public showMessage(message: string, options: MessageOptions) {
        this.snackBar.open(message, null, {
            duration: options.duration
        });
    }

    public showMessageWithAction(message: string, actionLabel: string, action: () => void, options: MessageOptions) {
        const snackBarRef = this.snackBar.open(message, actionLabel, {
            duration: options.duration
        });

        snackBarRef.onAction().subscribe(() => action());
    }
}
