import { Injectable } from '@angular/core';

/**
 * Responsible for managing the token of the currently authenticated user.
 *
 * This service should be used whenever the token needs to be accessed.
 */
@Injectable()
export class TokenStoreService {
    // This could be adapted to store elsewhere, but for now we just store the token in memory.
    private storedToken: string = null;

    constructor() {}

    /**
     * Gets the token for the currently authenticated user.
     *
     * Will throw an error when no token has been set.
     */
    public get token(): string {
        if (this.storedToken === null) {
            throw new Error('Token has not been set.');
        }

        return this.storedToken;
    }

    /**
     * Sets the token for the currently authenticated user.
     */
    public set token(token: string) {
        this.storedToken = token;
    }
}
