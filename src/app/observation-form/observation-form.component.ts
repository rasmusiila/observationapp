import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Rarity} from '../models/rarity';
import {ObservationService} from '../services/observation.service';
import {RarityService} from '../services/rarity.service';
import {Router} from '@angular/router';
import {requiredFileType} from './file-upload/requiredFileType';
import {FileUploadComponent} from './file-upload/file-upload.component';

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
        longitude: [''],
        avatarPath: [null],
        avatarFile: [null, requiredFileType(['png', 'jpeg'])] // TODO: maybe a filesize validator too
    });

    @ViewChild(FileUploadComponent, {static: false}) fileUpload: FileUploadComponent;

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
        if (this.observationForm.get('avatarFile').value) {
            const fileName = new Date().getTime().toString();
            this.fileUpload.startUpload(fileName).then((resp) => {
                console.log(resp);
                this.observationForm.patchValue({
                    avatarPath: fileName
                });
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                console.log('finally');
                this.observationService.addObservation(this.observationForm).subscribe(
                    data => {
                        console.log(data); // TODO: instead of console.log do actual logging
                        this.router.navigate(['/observations']).then(() => {
                            console.log('made it!');
                        });
                    }
                );
            });
        } else {
            this.observationService.addObservation(this.observationForm).subscribe(
                data => {
                    console.log(data); // TODO: instead of console.log do actual logging
                    this.router.navigate(['/observations']).then(() => {
                        console.log('made it!');
                    });
                }
            );
        }
        // this feels bloated, maybe transfer some to services?
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
