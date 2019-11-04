import {Rarity} from './rarity';
import {Deserializable} from './deserializable.model';

export class Observation implements Deserializable{
    id: number;
    speciesName: string;
    rarity: Rarity;
    notes: string;
    timestamp: Date;
    latitude: number;
    longitude: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        this.rarity = new Rarity().deserialize(input.rarity);
        this.timestamp = new Date(input.timestamp);

        return this;
    }
}
