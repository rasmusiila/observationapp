import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LogService {
    debug(message: any) {
        console.info(this.createLogStatement('debug', message));
    }

    error(message: any) {
        console.error(this.createLogStatement('error', message));
    }

    warn(message: any) {
        console.warn(this.createLogStatement('warning', message));
    }

    info(message: any) {
        console.info(this.createLogStatement('info', message));
    }

    createLogStatement(level, message) {
        return '[' + level + '] ' + this.getCurrentDate() + ' ' + JSON.stringify(message);
    }

    getCurrentDate() {
        return '[' + new Date().toLocaleString() + ']';
    }

    constructor() {
    }
}
