import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor() {
    }

    getPosition(): Observable<any> {
        return new Observable<any>(observer => {
            if (this.geoLocation) {
                this.geoLocation.getCurrentPosition(
                    (position) => {
                        observer.next(position);
                        observer.complete();
                    },
                    (error) => {
                        observer.error(error);
                    });
            } else {
                observer.error('Unsupported browser for Geolocation');
            }
        });
    }

    get geoLocation(): Geolocation {
        return navigator.geolocation;
    }
}
