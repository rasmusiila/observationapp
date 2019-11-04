import {Observation} from '../models/observation';
import {RARITIES} from './mock-rarities';

export const OBSERVATIONS: any = [
    {
        id: 1,
        speciesName: 'Grey tinamou',
        rarity: {
            id: 0,
            name: 'Common'
        },
        notes: 'Spotted building a nest on a pine tree',
        timestamp: new Date(2019, 4, 5, 6, 18, 20).toISOString()
    },
    {
        id: 2,
        speciesName: 'Asian ostrich',
        rarity: RARITIES[0],
        notes: 'Female; spotted with head in the sand',
        timestamp: new Date(2019, 9, 17, 18, 22, 11).toISOString()
    },
    {
        id: 3,
        speciesName: 'Southern brown kiwi',
        rarity: RARITIES[1],
        notes: 'Spotted sitting on a rock; Appeared to have an injured leg',
        timestamp: new Date(2019, 0, 24, 12, 47, 12).toISOString()
    },
    {
        id: 4,
        speciesName: 'Galah',
        rarity: RARITIES[0],
        notes: 'Spotted in her nest tending to hatchlings',
        timestamp: new Date(2019, 7, 31, 23, 15, 58).toISOString()
    },
    {
        id: 5,
        speciesName: 'Wood duck',
        rarity: RARITIES[0],
        notes: 'Enjoying the sunset',
        timestamp: new Date(2019, 7, 31, 21, 33, 54).toISOString()
    },
    {
        id: 6,
        speciesName: 'Dusky megapode',
        rarity: RARITIES[2],
        notes: 'Spotted exiting its lair from the side of a cliff.',
        timestamp: new Date(2019, 1, 7, 2, 27, 2).toISOString()
    }
];
