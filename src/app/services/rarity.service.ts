import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Rarity} from '../models/rarity';
import {RARITIES} from '../mocks/mock-rarities';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RarityService {
    constructor() {
    }

    getRarities(): Observable<Rarity[]> {
        // normally this would be an API call
        return of(this.mockRarities).pipe(
            map(raritiesJson => raritiesJson.map(rarityJson => new Rarity().deserialize(rarityJson))),
            catchError(err => {
                throw new Error(`Failed to get any rarities`);
            })
        );
    }

    getRarityById(id: number): Observable<Rarity> {
        return of(this.mockRarities.find(rarity => rarity.id === id)).pipe(
            map(rarityJson => {
                if (!rarityJson) {
                    throw new Error();
                }
                return new Rarity().deserialize(rarityJson);
            }),
            catchError(err => {
                // catches the error inside map but also before that if for some reason the find should throw an error
                throw new Error(`Failed to find rarity with id: ${id}`);
            })
        );
    }

    get mockRarities() {
        return RARITIES;
    }
}
