import { Injectable } from '@angular/core';

/**
 * Provides access to browser "location" via a service
 * this is wrapper for window location, so for api documentation see https://developer.mozilla.org/en-US/docs/Web/API/Location
 */
@Injectable()
export class BrowserLocationService {
    private blocation: any;

    constructor() {
        this.blocation = location;
        /*store native location object into local variable*/
    }

    public get host() {
        return this.blocation.host;
    }

    public get hash() {
        return this.blocation.hash;
    }

    public get hostname() {
        return this.blocation.hostname;
    }

    public get pathname() {
        return this.blocation.pathname;
    }

    public get protocol() {
        return this.blocation.protocol;
    }

    public get port() {
        return this.blocation.port;
    }

    public get search() {
        return this.blocation.search;
    }

    public assign(newUrl: string) {
        this.blocation.assign(newUrl);
    }

    public reload(){
        this.blocation.reload();
    }
}
