import {TestBed} from '@angular/core/testing';

import {ObservationService} from './observation.service';

describe('ObservationService', () => {
    let observationService: ObservationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ObservationService
            ]
        });
        observationService = TestBed.get(ObservationService);
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
                // expect(observation.timestamp).toBe(expectedObservations[i].timestamp);
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
});
