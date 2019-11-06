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
    avatarPath: string;
    avatarFile: File;

    deserialize(input: any): this {
        Object.assign(this, input);
        this.rarity = new Rarity().deserialize(input.rarity);
        this.timestamp = new Date(input.timestamp);
        delete this.avatarFile; // this field has no use after the image has been uploaded

        return this;
    }
}
