import {TestBed} from '@angular/core/testing';

import {RarityService} from './rarity.service';

describe('RarityService', () => {
    let rarityService: RarityService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RarityService
            ]
        });
        rarityService = TestBed.get(RarityService);
    });

    it('should be created', () => {
        expect(rarityService).toBeTruthy();
    });

    it('should return expected rarities', (done) => {
        const expectedRarities = [{id: 13, name: 'Extraordinary'}, {id: 75, name: 'Out of this world'},
            {id: 9, name: 'Pedestrian'}, {id: 5, name: 'Regular'}, {}];
        console.log(rarityService.mockRarities);
        spyOnProperty(rarityService, 'mockRarities').and.returnValue(expectedRarities);

        rarityService.getRarities().subscribe(rarities => {
            expect(rarities.length).toBe(expectedRarities.length);
            rarities.forEach((rarity, i) => {
                expect(rarity.id).toBe(expectedRarities[i].id);
                expect(rarity.name).toBe(expectedRarities[i].name);
            });
            done();
        }, () => fail('expected rarities, not an error'));
    });

    it('should return an error when the rarity container is invalid', () => {
        const expectedRarities = null;

        spyOnProperty(rarityService, 'mockRarities').and.returnValue(expectedRarities);

        rarityService.getRarities().subscribe(() => {
            fail('expected an error, not a rarity');
        }, error => expect(error.message).toContain('Failed to get any rarities'));
    });

    it('should return an expected rarity', (done) => {
        const rarities = [{id: 13, name: 'Extraordinary'}, {id: 75, name: 'Out of this world'},
            {id: 9, name: 'Pedestrian'}, {id: 5, name: 'Regular'}, {}];
        const expectedRarityId = 0;

        spyOnProperty(rarityService, 'mockRarities').and.returnValue(rarities);

        rarityService.getRarityById(rarities[expectedRarityId].id).subscribe(rarity => {
            expect(rarity.id).toBe(rarities[expectedRarityId].id);
            expect(rarity.name).toBe(rarities[expectedRarityId].name);
            done();
        }, () => fail('expected a rarity, not an error'));
    });

    it('should return an error when the id does not exist', () => {
        const rarities = [{id: 13, name: 'Extraordinary'}, {id: 75, name: 'Out of this world'},
            {id: 9, name: 'Pedestrian'}, {id: 5, name: 'Regular'}, {}];
        const expectedRarityId = 1;

        spyOnProperty(rarityService, 'mockRarities').and.returnValue(rarities);

        rarityService.getRarityById(expectedRarityId).subscribe(() => {
            fail('expected an error, not a rarity');
        }, error => expect(error.message).toContain(`Failed to find rarity with id: ${expectedRarityId}`));
    });
});
