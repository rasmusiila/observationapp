import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Rarity} from '../models/rarity';
import {ObservationService} from '../services/observation.service';
import {RarityService} from '../services/rarity.service';
import {Observation} from '../models/observation';
import {Router} from '@angular/router';

@Component({
    selector: 'app-observation-form',
    templateUrl: './observation-form.component.html',
    styleUrls: ['./observation-form.component.scss']
})
export class ObservationFormComponent implements OnInit {

    rarities: Rarity[];
    observationForm = this.fb.group({
        speciesName: [
            '',
            [Validators.required, Validators.minLength(3)]
        ],
        rarity: ['', Validators.required],
        notes: [''],
        timestamp: [''],
        latitude: [''],
        longitude: ['']
    });

    constructor(private fb: FormBuilder, private rarityService: RarityService, private observationService: ObservationService,
                private router: Router) {
    }

    ngOnInit() {
        this.getRarities();
    }

    getRarities(): void {
        this.rarityService.getRarities()
            .subscribe(rarities => this.rarities = rarities);
    }

    onSubmit() {
        // TODO: am i supposed to check for validation errors here too?
        this.observationService.addObservation(this.observationForm).subscribe(
            data => {
                console.log(data); // TODO: instead of console.log do actual logging
                this.router.navigate(['/observations']).then(() => {
                    console.log('made it!');
                });
            }
        );
    }

    clearFields() {
        this.observationForm.reset();
    }

    get speciesName() {
        return this.observationForm.get('speciesName');
    }

    get rarity() {
        return this.observationForm.get('rarity');
    }
}
