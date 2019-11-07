import {TestBed} from '@angular/core/testing';

import {LocationService} from './location.service';

describe('LocationService', () => {
    let locationService: LocationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LocationService
            ]
        });
        locationService = TestBed.get(LocationService);
    });

    it('should be created', () => {
        expect(locationService).toBeTruthy();
    });

    // TODO: come back to this later, maybe you will learn something that will help you with spying on GeoLocation
    // it('should return geolocation', (done) => {
    //     const expectedPosition: Position = {
    //         coords: {
    //             accuracy: 0,
    //             altitude: null,
    //             altitudeAccuracy: null,
    //             heading: null,
    //             latitude: 59.35422,
    //             longitude: 23.34422,
    //             speed: 0
    //         },
    //         timestamp: new Date().getTime()
    //     };
    //
    //     // spyOn(locationService.geoLocation, 'getCurrentPosition').and.callFake(() => {
    //     //     console.log('hey');
    //     // });
    //     locationService.getPosition().subscribe(
    //         (position) => {
    //             console.log(position);
    //             expect(position.coords.latitude).toBeCloseTo(expectedPosition.coords.latitude, 0.00001);
    //             expect(position.coords.longitude).toBeCloseTo(expectedPosition.coords.longitude, 0.00001);
    //             done();
    //         },
    //         error => fail('expected a position, not an error'));
    // });

    it('should return an error when browser does not support geolocation', () => {
        spyOnProperty(locationService, 'geoLocation').and.returnValue(null);
        locationService.getPosition().subscribe(
            () => fail('expected an error, not position'),
            error => expect(error).toContain('Unsupported browser for Geolocation'));
    });

    it('should return an error when geolocation query failed for various reasons', () => {
        spyOnProperty(locationService, 'geoLocation').and.throwError('User denied the request for Geolocation');
        locationService.getPosition().subscribe(
            () => fail('expected an error, not position'),
            error => expect(error.message).toContain('User denied the request for Geolocation'));
    });
});
