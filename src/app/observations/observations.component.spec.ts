import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ObservationsComponent} from './observations.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {ExcerptPipe} from '../pipes/excerpt.pipe';
import {ObservationService} from '../services/observation.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observation} from '../models/observation';
import {Observable, of} from 'rxjs';

class MockObservationService {
    getObservations(): Observable<Observation[]> {
        return of([]);
    }
}

class MockAngularFireStorage {
}

describe('ObservationsComponent', () => {
    let observationsComponent: ObservationsComponent;
    let fixture: ComponentFixture<ObservationsComponent>;
    let observationService: ObservationService;
    let angularFireStorage: AngularFireStorage;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ObservationsComponent,
                ExcerptPipe
            ],
            imports: [
                MDBBootstrapModule
            ],
            providers: [
                {provide: ObservationService, useClass: MockObservationService},
                {provide: AngularFireStorage, useClass: MockAngularFireStorage}
            ]
        })
            .compileComponents();


    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ObservationsComponent);
        observationsComponent = fixture.componentInstance;

        observationService = TestBed.get(ObservationService);
        angularFireStorage = TestBed.get(AngularFireStorage);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(observationsComponent).toBeTruthy();
    });
});
