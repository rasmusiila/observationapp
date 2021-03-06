import {Component, OnInit} from '@angular/core';
import {Observation} from '../models/observation';
import {compare, compareDates, compareTimes} from './utils/compare';
import {ObservationService} from '../services/observation.service';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
    selector: 'app-observations',
    templateUrl: './observations.component.html',
    styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent implements OnInit {
    observations: Observation[];
    sortedData: Observation[];

    headElements = [
        {name: 'speciesName', title: 'Species name', toggle: false},
        {name: 'rarity', title: 'Rarity', toggle: false},
        {name: 'date', title: 'Date', toggle: false},
        {name: 'time', title: 'Time', toggle: false},
        {name: 'latitude', title: 'Latitude', toggle: false},
        {name: 'longitude', title: 'Longitude', toggle: false}
    ];
    sortingElement = '';

    constructor(private observationService: ObservationService, private storage: AngularFireStorage) {
    }

    ngOnInit() {
        this.observationService.getObservations().subscribe(observations => {
            this.observations = observations;
            this.sortDataChronologically();
            this.getAvatars();
        });
    }

    sortDataChronologically() {
        this.sortedData = this.observations.slice().sort((a, b) => {
            return compare(a.timestamp, b.timestamp, true);
        });
    }

    sortData(head: any) {
        head.toggle = !head.toggle;
        this.sortingElement = head.name;

        // the sorting overwrites the previous sorting - this allows you to technically sort by multiple columns
        this.sortedData.sort((a, b) => {
            const isAsc = head.toggle;
            switch (this.sortingElement) {
                case 'speciesName':
                    return compare(a.speciesName, b.speciesName, isAsc);
                case 'rarity':
                    return compare(a.rarity.id, b.rarity.id, isAsc);
                case 'date':
                    return compareDates(a.timestamp, b.timestamp, isAsc);
                case 'time':
                    return compareTimes(a.timestamp, b.timestamp, isAsc);
                case 'latitude':
                    return compare(a.latitude, b.latitude, isAsc);
                case 'longitude':
                    return compare(a.longitude, b.longitude, isAsc);
                default:
                    return 0;
            }
        });
    }

    getAvatars() {
        this.observations.forEach(observation => {
            if (observation.avatarPath) {
                this.storage.ref(`images/${observation.avatarPath}`).getDownloadURL().subscribe(downloadUrl => {
                    observation.avatarPath = downloadUrl;
                });
            }
        });
    }
}
