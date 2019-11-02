import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Rarity} from '../models/rarity';
import {RARITIES} from '../mocks/mock-rarities';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RarityService {

    constructor() {
    }

    getRarities(): Observable<Rarity[]> {
        return of(RARITIES).pipe(
            map(raritiesJson => raritiesJson.map(rarityJson => new Rarity().deserialize(rarityJson)))
        );
    }

    getRarityById(id: number): Observable<Rarity> {
        return of(RARITIES.find(rarity => rarity.id === id)).pipe(
            map(rarityJson => new Rarity().deserialize(rarityJson))
        );
    }
}
