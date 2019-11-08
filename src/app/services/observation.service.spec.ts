import {TestBed} from '@angular/core/testing';

import {ObservationService} from './observation.service';
import {Observable} from 'rxjs';
import {FormGroup, FormControl} from '@angular/forms';
import {LocationService} from './location.service';

describe('ObservationService', () => {
    let observationService: ObservationService;
    let locationServiceSpy: jasmine.SpyObj<LocationService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('LocationService', ['getPosition']);
        TestBed.configureTestingModule({
            providers: [
                ObservationService,
                {provide: LocationService, useValue: spy}
            ]
        });
        observationService = TestBed.get(ObservationService);
        locationServiceSpy = TestBed.get(LocationService);
    });

    function compareObservations(done: DoneFn, expectedObservations) {
        observationService.getObservations().subscribe(observations => {
            expect(observations.length).toBe(expectedObservations.length);
            observations.forEach((observation, i) => {
                expect(observation.id).toBe(expectedObservations[i].id);
                expect(observation.speciesName).toBe(expectedObservations[i].speciesName);
                expect(observation.rarity.id).toBe(expectedObservations[i].rarity.id);
                expect(observation.rarity.name).toBe(expectedObservations[i].rarity.name);
                expect(observation.notes).toBe(expectedObservations[i].notes);
                expect(Object.is(observation.timestamp.getTime(), new Date(expectedObservations[i].timestamp).getTime())).toBeTruthy();
                expect(observation.latitude).toBe(expectedObservations[i].latitude);
                expect(observation.longitude).toBe(expectedObservations[i].longitude);
                expect(observation.avatarPath).toBe(expectedObservations[i].avatarPath);
            });
            done();
        }, () => fail('expected observations, not an error'));
    }

    it('should be created', () => {
        expect(observationService).toBeTruthy();
    });

    it('should return an empty container when key does not exist in localstorage', () => {
        spyOn(localStorage, 'getItem').and.returnValue(null);

        expect(observationService.getLocalStorageObservations()).toEqual([]);
    });

    it('should return an empty container when key does not exist in localstorage', () => {
        const expectedLocalStorageOutput = '[{"speciesName":"Red-throated loon","rarity":{"id":2,"name":"Rare"},' +
            '"notes":"","timestamp":"2019-11-05T22:29:22.202Z","latitude":59.402420799999994,"longitude":24.7739674,' +
            '"avatarPath":null,"id":7},{"speciesName":"Sichuan partridge","rarity":{"id":1,"name":"Common"},"notes":"",' +
            '"timestamp":"2019-11-05T22:31:25.394Z","latitude":59.402420799999994,"longitude":24.7739674,' +
            '"avatarPath":"1572993083224","id":8}]';

        spyOn(localStorage, 'getItem').and.returnValue(expectedLocalStorageOutput);

        expect(observationService.getLocalStorageObservations()).toEqual(JSON.parse(expectedLocalStorageOutput));
    });

    it('should return only mock observations', (done) => {
        const expectedObservations = [{
            id: 1, speciesName: 'Test Species', rarity: {id: 1, name: 'Common'},
            notes: 'Test note', timestamp: new Date().toISOString(), latitude: 12.55243, longitude: 98.4246,
            avatarPath: 'test.jpg'
        }, {
            id: 2, speciesName: 'Test Species 2', rarity: {id: 1, name: 'Common'},
            notes: 'Test note 2', timestamp: new Date().toISOString()
        }, {rarity: {}}];

        spyOn(observationService, 'getMockObservations').and.returnValue(expectedObservations);
        spyOn(observationService, 'getLocalStorageObservations').and.returnValue([]);

        compareObservations(done, expectedObservations);
    });

    it('should return only localstorage observations', (done) => {
        const expectedObservations = [{
            id: 1, speciesName: 'Test Species', rarity: {id: 1, name: 'Common'},
            notes: 'Test note', timestamp: new Date().toISOString(), latitude: 9.8345, longitude: 98.4246,
            avatarPath: 'test.jpg'
        }, {
            id: 2, speciesName: 'Test Species 2', rarity: {id: 1, name: 'Common'},
            notes: 'Test note 2', timestamp: new Date().toISOString()
        }];

        spyOn(observationService, 'getMockObservations').and.returnValue([]);
        spyOn(observationService, 'getLocalStorageObservations').and.returnValue(expectedObservations);

        compareObservations(done, expectedObservations);
    });

    it('should return both observations', (done) => {
        const expectedMockObservations = [{
            id: 1, speciesName: 'Test Species', rarity: {id: 1, name: 'Common'},
            notes: 'Test note', timestamp: new Date().toISOString(), latitude: 9.8345, longitude: 98.4246,
            avatarPath: 'test.jpg'
        }, {
            id: 2, speciesName: 'Test Species 2', rarity: {id: 1, name: 'Common'},
            notes: 'Test note 2', timestamp: new Date().toISOString()
        }];
        const expectedLocalStorageObservations = [{
            id: 3, speciesName: 'Test Species3', rarity: {id: 2, name: 'Rare'},
            notes: 'Test note3', timestamp: new Date().toISOString(), latitude: 19.8345, longitude: 28.4246,
            avatarPath: 'test.jpg'
        }, {
            id: 4, speciesName: 'Test Species 4', rarity: {id: 1, name: 'Common'},
            notes: 'Test note 4', timestamp: new Date().toISOString()
        }];

        spyOn(observationService, 'getMockObservations').and.returnValue(expectedMockObservations);
        spyOn(observationService, 'getLocalStorageObservations').and.returnValue(expectedLocalStorageObservations);

        compareObservations(done, expectedMockObservations.concat(expectedLocalStorageObservations));
    });

    it('should return an error when the mock observations container has invalid values', () => {
        const expectedRarities = null;

        spyOn(observationService, 'getMockObservations').and.returnValue([null]);
        spyOn(observationService, 'getLocalStorageObservations').and.returnValue([]);

        observationService.getObservations().subscribe((observations) =>
                expect(observations.length).toBe(0),
            () => fail('expected an empty container, not an error')
        );
    });

    it('should return an empty observable when the localstorage observations container has invalid values', () => {
        const expectedRarities = null;

        spyOn(observationService, 'getMockObservations').and.returnValue([]);
        spyOn(observationService, 'getLocalStorageObservations').and.returnValue([null]);

        observationService.getObservations().subscribe((observations) =>
                expect(observations.length).toBe(0),
            () => fail('expected an empty container, not an error')
        );
    });

    it('should return 1 if there are no observations', () => {
        spyOn(observationService, 'getMockObservations').and.returnValue([]);
        spyOn(observationService, 'getLocalStorageObservations').and.returnValue([]);

        expect(observationService.genId()).toEqual(1);
    });

    it('should add new observation and return it', () => {
        const formGroup: FormGroup = new FormGroup({
            speciesName: new FormControl('Species 1'),
            timestamp: new FormControl(''),
            latitude: new FormControl(''),
            longitude: new FormControl('')
        });

        const expectedPosition: Position = {
            coords: {
                accuracy: 0,
                altitude: null,
                altitudeAccuracy: null,
                heading: null,
                latitude: 59.35422,
                longitude: 23.34422,
                speed: 0
            },
            timestamp: new Date().getTime()
        };

        spyOn(observationService, 'getMockObservations').and.returnValue([]);
        spyOn(observationService, 'getLocalStorageObservations').and.returnValue([]);
        const addObservationToLocalStorageSpy = spyOn(observationService, 'addObservationToLocalStorage')
            .and.callFake(() => {
            });

        locationServiceSpy.getPosition.and.returnValue(new Observable<any>(observer => {
            observer.next(expectedPosition);
            observer.complete();
        }));

        observationService.addObservation(formGroup).subscribe(observation => {
            console.log(observation);
            expect(observation.id).toBe(1);
            expect(typeof observation.timestamp).toBe(typeof new Date());
            expect(locationServiceSpy.getPosition.calls.count()).toBe(1);
            expect(observation.latitude).toBe(expectedPosition.coords.latitude);
            expect(observation.longitude).toBe(expectedPosition.coords.longitude);
            expect(addObservationToLocalStorageSpy.calls.count()).toBe(1);
        });
    });

    it('should add new observation without latitude and longitude', () => {
        const formGroup: FormGroup = new FormGroup({
            speciesName: new FormControl('Species 1'),
            timestamp: new FormControl(''),
            latitude: new FormControl(''),
            longitude: new FormControl('')
        });

        spyOn(observationService, 'getMockObservations').and.returnValue([]);
        spyOn(observationService, 'getLocalStorageObservations').and.returnValue([]);
        spyOn(observationService, 'addObservationToLocalStorage')
            .and.callFake(() => {
        });

        locationServiceSpy.getPosition.and.returnValue(new Observable<any>(observer => {
            observer.error('Geolocation not received due to test');
        }));

        observationService.addObservation(formGroup).subscribe(observation => {
            expect(observation.latitude).toBe('');
            expect(observation.longitude).toBe('');
        });
    });
});
