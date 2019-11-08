import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Rarity} from '../models/rarity';
import {ObservationService} from '../services/observation.service';
import {RarityService} from '../services/rarity.service';
import {Router} from '@angular/router';
import {requiredFileType} from './file-upload/requiredFileType';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {LogService} from '../services/log.service';

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
                private router: Router, private logService: LogService) {
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
            this.fileUpload.startUpload(fileName).then(() => {
                this.observationForm.patchValue({
                    avatarPath: fileName
                });
            }).catch(err => {
                console.log(err);
                this.logService.warn(err);
            }).finally(() => {
                this.logService.debug('File upload process completed');
                this.addObservation();
            });
        } else {
            this.addObservation();
        }
        // this feels bloated, maybe transfer some to services?
    }

    private addObservation() {
        this.observationService.addObservation(this.observationForm).subscribe(
            data => {
                this.logService.debug(data);
                this.router.navigate(['/observations']).then(() => {
                    this.logService.debug('Observation adding process completed');
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
