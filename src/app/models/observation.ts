import {Rarity} from './rarity';
import {Deserializable} from './deserializable.model';

export class Observation implements Deserializable{
    id: number;
    speciesName: string;
    rarity: Rarity;
    notes: string;
    timestamp: Date;

    deserialize(input: any): this {
        Object.assign(this, input);

        this.rarity = new Rarity().deserialize(input.rarity);

        return this;
    }
}
