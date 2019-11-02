import {Injectable} from '@angular/core';
import {OBSERVATIONS} from '../mocks/mock-observations';
import {Observation} from '../models/observation';
import {Observable, of} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ObservationService {
    private observations: Observation[];

    constructor() {
    }

    getObservations(): Observable<Observation[]> {
        // localStorage.removeItem('observationsArray');
        // TODO: remove the line above when you submit it - uncomment to remove the stored entries from localstorage
        return of(this.getMockObservations().concat(this.getLocalStorageObservations())).pipe(
            map(observationsJson => observationsJson.map(
                observationJson => new Observation().deserialize(observationJson)
                )
            )
        );
    }

    getMockObservations(): any {
        return OBSERVATIONS;
    }

    getLocalStorageObservations(): any {
        const localStorageObservations = JSON.parse(localStorage.getItem('observationsArray'));
        return localStorageObservations || [];
    }

    addObservation(form: FormGroup): Observable<Observation> {
        const observation: Observation = new Observation().deserialize(form.value);

        observation.id = this.genId(); // this is front-end only so an ID is needed
        observation.timestamp = new Date();

        const oldObservations = this.getLocalStorageObservations();
        oldObservations.push(observation);
        localStorage.setItem('observationsArray', JSON.stringify(oldObservations));

        return of(observation); // normally this would be the response you receive from backend
    }

    private genId(): number {
        this.getObservations().subscribe(observations => this.observations = observations);
        // I tried to find an easier way to get an Observable array's length but I couldn't find one
        return this.observations.length + 1;
    }
}
