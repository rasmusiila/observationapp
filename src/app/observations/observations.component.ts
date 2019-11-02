import {Component, OnInit, ViewChild} from '@angular/core';
import {Observation} from '../models/observation';
import {MatSort, MatTableDataSource, Sort} from '@angular/material';
import {compare, compareDates, compareTimes} from './utils/compare';
import {ObservationService} from '../services/observation.service';
import {RarityService} from '../services/rarity.service';

@Component({
    selector: 'app-observations',
    templateUrl: './observations.component.html',
    styleUrls: ['./observations.component.css']
})
export class ObservationsComponent implements OnInit {
    observations: Observation[];
    sortedData: Observation[];

    constructor(private observationService: ObservationService, private rarityService: RarityService) {
        // this.sortedData = this.observations.slice();
    }

    ngOnInit() {
        this.getObservations();
        this.sortDataChronologically();
        // TODO: this might be suspect if the query from server takes time, maybe it should go to the service layer altogether
    }

    getObservations(): void {
        this.observationService.getObservations()
            .subscribe(observations => this.observations = observations);
    }

    sortDataChronologically() {
        this.sortedData = this.observations.slice().sort((a, b) => {
            return compare(a.timestamp, b.timestamp, true);
        });
    }

    sortData(sort: Sort) {
        const data = this.observations.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedData = data;
            return;
        }

        this.sortedData = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'speciesName':
                    return compare(a.speciesName, b.speciesName, isAsc);
                case 'rarity':
                    return compare(a.rarity.id, b.rarity.id, isAsc);
                case 'date':
                    return compareDates(a.timestamp, b.timestamp, isAsc);
                case 'time':
                    return compareTimes(a.timestamp, b.timestamp, isAsc);
                default:
                    return 0;
            }
        });
    }
}
