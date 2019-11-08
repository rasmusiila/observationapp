import {Injectable} from '@angular/core';
import {OBSERVATIONS} from '../mocks/mock-observations';
import {Observation} from '../models/observation';
import {Observable, of} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {catchError, map} from 'rxjs/operators';
import {LocationService} from './location.service';

@Injectable({
    providedIn: 'root'
})
export class ObservationService {
    constructor(private locationService: LocationService) {
    }

    getObservations(): Observable<Observation[]> {
        // localStorage.removeItem('observationsArray');
        // TODO: remove the line above when you submit it - uncomment to remove the stored entries from localstorage
        return of(this.getMockObservations().concat(this.getLocalStorageObservations())).pipe(
            map(observationsJson => observationsJson.map(
                observationJson => new Observation().deserialize(observationJson)
                )
            ),
            catchError(() => {
                console.log('An error occurred while retrieving observations');
                return of([]);
            })
        );
    }

    getMockObservations(): any[] {
        return OBSERVATIONS;
    }

    getLocalStorageObservations(): any[] {
        const localStorageObservations = JSON.parse(localStorage.getItem('observationsArray'));
        return localStorageObservations || [];
    }

    addObservation(form: FormGroup): Observable<any> {
        const observation: Observation = new Observation().deserialize(form.value);

        observation.id = this.genId(); // this is front-end only so an ID is needed
        observation.timestamp = new Date();
        return this.locationService.getPosition().pipe(
            catchError(err => {
                // this first catchError catches the possible error from LocationService
                switch (err.code) {
                    case undefined:
                        console.log(err);
                        break;
                    case err.PERMISSION_DENIED:
                        console.log('User denied the request for Geolocation.');
                        break;
                    case err.POSITION_UNAVAILABLE:
                        console.log('Location information is unavailable.');
                        break;
                    case err.TIMEOUT:
                        console.log('The request to get user location timed out.');
                        break;
                    default:
                        console.log('Unknown error encountered.');
                        break;
                    // TODO: do actual logging here not console log
                }
                return of({});
            }),
            map(
                // in this part the latitude and longitude are added to the observation
                coordinates => {
                    observation.latitude = coordinates.coords.latitude;
                    observation.longitude = coordinates.coords.longitude;
                }
            ),
            catchError(
                // this catches the possible error when coordinates were not returned from LocationService
                () => {
                    return of({});
                }
            ),
            map(
                // this saves the observation into LocalStorage (in a real app this should be the place where you do an API request)
                () => {
                    this.addObservationToLocalStorage(observation);
                    return observation;
                }
            ));
    }

    genId(): number {
        // this function is only really needed because there is no backend so an id won't be assigned automatically
        return this.getMockObservations().concat(this.getLocalStorageObservations()).length + 1;
    }

    addObservationToLocalStorage(observation: Observation): void {
        const oldObservations = this.getLocalStorageObservations();
        oldObservations.push(observation);
        localStorage.setItem('observationsArray', JSON.stringify(oldObservations));
    }
}
